
using Microsoft.EntityFrameworkCore;
namespace DataSchool
{
    public class EscuelaContext : DbContext
    {
        public EscuelaContext (DbContextOptions<EscuelaContext> options): base(options)
        {

        }

        public DbSet<Alumno> Alumnos { get; set; }

        public DbSet<Profesor> Profesores { get; set; }

        public DbSet<Grado> Grados { get; set; }

        public DbSet<AlumnoGrado> AlumnoGrados { get; set; }
    }
}