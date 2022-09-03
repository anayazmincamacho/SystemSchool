using Microsoft.AspNetCore.Mvc;
using DataSchool;
using System.Linq;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SystemSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoGradoController : ControllerBase
    {

        private EscuelaContext Context;

        public AlumnoGradoController(EscuelaContext context)
        {
            Context = context;
        }


        // GET: api/<AlumnoGradoController>
        [HttpGet]
        public IEnumerable<AlumnoGrado> Get()
        {
            return Context.AlumnoGrados.ToList();
        }

        [HttpGet("/listaAlumno")]
        public IActionResult JoinAlumnos()
        {
            var datos = (from alumnogrado in Context.AlumnoGrados
                         join alumno in Context.Alumnos on alumnogrado.AlumnoId equals alumno.AlumnoId
                         select new
                         {
                             alumno.Name,
                             alumno.Apellidos,
                             alumnogrado.GradoId,
                             alumnogrado.Id,
                             alumno.AlumnoId
                         });
            return Ok(datos);
        }




        // GET api/<AlumnoGradoController>/5
        [HttpGet("{id}")]
        public AlumnoGrado Get(int id)
        {
            var dato = Context.AlumnoGrados.FirstOrDefault(x => x.Id == id);
            return dato;
        }

        // POST api/<AlumnoGradoController>
        [HttpPost]
        public ActionResult Post([FromBody] AlumnoGrado alumnoGrado)
        {
            Context.AlumnoGrados.Add(alumnoGrado);
            Context.SaveChanges();
            return Ok();
        }

        // PUT api/<AlumnoGradoController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] AlumnoGrado alumnoGrado)
        {
            var dato = Context.AlumnoGrados.FirstOrDefault(x => x.Id == id);

            if(dato != null)
            {
                Context.Entry(dato).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                Context.SaveChanges();
                return Ok(dato);
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<AlumnoGradoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var dato = Context.AlumnoGrados.FirstOrDefault(x => x.Id == id);
            if(dato!= null)
            {
                Context.AlumnoGrados.Remove(dato);
                Context.SaveChanges();
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }
    }
}
