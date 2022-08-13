using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataSchool
{
    public class AlumnoGrado
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [ForeignKey("AlumnoId")]
        public int AlumnoId { get; set; }

        [ForeignKey("Id")]
        public int GradoId { get; set; }

        public string Seccion { get; set; }

       

    }
}
