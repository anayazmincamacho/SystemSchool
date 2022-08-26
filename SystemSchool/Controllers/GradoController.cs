using Microsoft.AspNetCore.Mvc;
using DataSchool;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SystemSchool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GradoController : ControllerBase
    {
        private EscuelaContext Context;

        public GradoController(EscuelaContext context)
        {
            Context = context;
        }

        // GET: api/<GradoController>
        [HttpGet]
        public IEnumerable<Grado> Get()
        {
             return Context.Grados.ToList();


        }

        [HttpGet("/lista")]
       public object JoinGrados()
        {
            var datos = (from grado in Context.Grados
                         join profesor in Context.Profesores on grado.ProfesorId equals profesor.ProfesorId
                         select new
                         {
                             grado.Id,
                             grado.Nombre,
                             profesor = profesor.Nombre + " " + profesor.Apellidos
                         }).ToList();
            return datos;
        }

        // GET api/<GradoController>/5
        [HttpGet("{id}")]
        public Grado Get(int id)
        {
            var grado = Context.Grados.FirstOrDefault(x => x.Id == id);
            return grado;
        }

        // POST api/<GradoController>
        [HttpPost]
        public ActionResult Post([FromBody] Grado grado)
        {
            if(grado != null)
            {
                Context.Grados.Add(grado);
                Context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        // PUT api/<GradoController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Grado grado)
        {
           if(grado.Id == id)
            {
                Context.Entry(grado).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                Context.SaveChanges();
                return Ok();
            }
           else
            {
                return BadRequest();
            }
        }

        // DELETE api/<GradoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var dato = Context.Grados.FirstOrDefault(x => x.Id == id);
            if(dato != null)
            {
                Context.Grados.Remove(dato);
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
