using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataSchool
{
    public class Alumno
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AlumnoId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [StringLength(500)]
        public string Apellidos { get; set; }

        public string Genero { get; set; }

        [Required]
        public DateTime FechaNacimiento { get; set; }


        //public virtual ICollection<Alumno> Alumnos { get; set; }
    }
}
