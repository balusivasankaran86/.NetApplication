﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EF_DbFirst.DB_Model
{
    public partial class DB_FristEntities
    {
        public string UserName { get; set; }
        List<DBAudit> auditTrailList = new List<DBAudit>();

        public enum AuditActions
        {
            I,
            U,
            D
        }

        partial void OnContextCreated()
        {
            this.SavingChanges += new EventHandler(AdventureWorksEntities_SavingChanges);
        }

        void AdventureWorksEntities_SavingChanges(object sender, EventArgs e)
        {
            IEnumerable<ObjectStateEntry> changes = this.ObjectStateManager.GetObjectStateEntries(EntityState.Added | EntityState.Deleted | EntityState.Modified);
            foreach (ObjectStateEntry stateEntryEntity in changes)
            {
                if (!stateEntryEntity.IsRelationship &&
                        stateEntryEntity.Entity != null &&
                            !(stateEntryEntity.Entity is DBAudit))
                {//is a normal entry, not a relationship
                    DBAudit audit = this.AuditTrailFactory(stateEntryEntity, UserName);
                    auditTrailList.Add(audit);
                }
            }

            if (auditTrailList.Count > 0)
            {
                foreach (var audit in auditTrailList)
                {//add all audits 
                    this.AddToDBAudit(audit);
                }
            }
        }

        private DBAudit AuditTrailFactory(ObjectStateEntry entry, string UserName)
        {
            DBAudit audit = new DBAudit();
            audit.AuditId = Guid.NewGuid().ToString();
            audit.RevisionStamp = DateTime.Now;
            audit.TableName = entry.EntitySet.Name;
            audit.UserName = UserName;

            if (entry.State == EntityState.Added)
            {//entry is Added 
                audit.NewData = GetEntryValueInString(entry, false);
                audit.Actions = AuditActions.I.ToString();
            }
            else if (entry.State == EntityState.Deleted)
            {//entry in deleted
                audit.OldData = GetEntryValueInString(entry, true);
                audit.Actions = AuditActions.D.ToString();
            }
            else
            {//entry is modified
                audit.OldData = GetEntryValueInString(entry, true);
                audit.NewData = GetEntryValueInString(entry, false);
                audit.Actions = AuditActions.U.ToString();

                IEnumerable<string> modifiedProperties = entry.GetModifiedProperties();
                //assing collection of mismatched Columns name as serialized string 
                audit.ChangedColumns = XMLSerializationHelper.XmlSerialize(modifiedProperties.ToArray());
            }

            return audit;
        }

        private string GetEntryValueInString(ObjectStateEntry entry, bool isOrginal)
        {
            if (entry.Entity is EntityObject)
            {
                object target = CloneEntity((EntityObject)entry.Entity);
                foreach (string propName in entry.GetModifiedProperties())
                {
                    object setterValue = null;
                    if (isOrginal)
                    {
                        //Get orginal value 
                        setterValue = entry.OriginalValues[propName];
                    }
                    else
                    {
                        //Get orginal value 
                        setterValue = entry.CurrentValues[propName];
                    }
                    //Find property to update 
                    PropertyInfo propInfo = target.GetType().GetProperty(propName);
                    //update property with orgibal value 
                    if (setterValue == DBNull.Value)
                    {//
                        setterValue = null;
                    }
                    propInfo.SetValue(target, setterValue, null);
                }//end foreach

                XmlSerializer formatter = new XmlSerializer(target.GetType());
                XDocument document = new XDocument();

                using (XmlWriter xmlWriter = document.CreateWriter())
                {
                    formatter.Serialize(xmlWriter, target);
                }
                return document.Root.ToString();
            }
            return null;
        }

        public EntityObject CloneEntity(EntityObject obj)
        {
            DataContractSerializer dcSer = new DataContractSerializer(obj.GetType());
            MemoryStream memoryStream = new MemoryStream();

            dcSer.WriteObject(memoryStream, obj);
            memoryStream.Position = 0;

            EntityObject newObject = (EntityObject)dcSer.ReadObject(memoryStream);
            return newObject;
        }
    }
}
