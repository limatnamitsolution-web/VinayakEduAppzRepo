using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace VLimat.Eduz.Domain.Features.Masters
{
    [Table("MasterConfigs", Schema = "mst")]
    public class MasterConfig
    {
        public int Id { get; set; }
        public int AcademicId { get; set; }
        public string Configuration { get; set; }
        public string ConfigKey { get; set; }
        public string ConfigValue { get; set; }
        public string Description { get; set; }
        public int SortOrder { get; set; }
        public int AC_Yr { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public int? ModifiedBy { get; set; }

    }
}
