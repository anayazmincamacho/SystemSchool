using Microsoft.AspNetCore.Mvc;
using DataSchool;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SystemSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlumnoController : ControllerBase
    {

        private EscuelaContext Context;

        public AlumnoController (EscuelaContext context)
        {
            Context = context;
        }

        // GET: api/<AlumnoController>
        [HttpGet]
        public IEnumerable<Alumno> Get()
        {
            return Context.Alumnos.ToList();
        }

        // GET api/<AlumnoController>/5
        [HttpGet("{id}")]
        public Alumno Get(int id)
        {
            var student = Context.Alumnos.FirstOrDefault(x => x.AlumnoId == id);
            return student;
        }

        // POST api/<AlumnoController>
        [HttpPost]
        public ActionResult Post([FromBody] Alumno alumno)
        {
            var student = Context.Alumnos.FirstOrDefault(x => x.Name == alumno.Name && x.Apellidos == alumno.Apellidos);
            if (student == null)
            {
                try
                {
                    Context.Alumnos.Add(alumno);
                    Context.SaveChanges();
                    return Ok();
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
            else
            {
                return BadRequest();
            }

        }

        // PUT api/<AlumnoController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Alumno alumno)
        {
            if(alumno.AlumnoId == id)
            {
                Context.Entry(alumno).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                Context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // DELETE api/<AlumnoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var student = Context.Alumnos.FirstOrDefault(x => x.AlumnoId == id);
            if(student!= null)
            {
                Context.Alumnos.Remove(student);
                Context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
