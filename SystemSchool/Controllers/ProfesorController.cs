using Microsoft.AspNetCore.Mvc;
using DataSchool;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace SystemSchool.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private EscuelaContext Context;

        public ProfesorController (EscuelaContext context)
        {
            Context = context;
        }



        // GET: api/<ProfesorController>
        [HttpGet]
        public IEnumerable<Profesor> Get()
        {
            return Context.Profesores.ToList();
        }

        // GET api/<ProfesorController>/5
        [HttpGet("{id}")]
        public Profesor Get(int id)
        {
            var teacher = Context.Profesores.FirstOrDefault(x => x.ProfesorId == id);
            return teacher;
        }

        // POST api/<ProfesorController>
        [HttpPost]
        public ActionResult Post([FromBody] Profesor profesor)
        {
            try
            {
                Context.Profesores.Add(profesor);
                Context.SaveChanges();
                return Ok();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ProfesorController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Profesor profesor)
        {
            if (profesor.ProfesorId == id)
            {
                Context.Entry(profesor).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                Context.SaveChanges();
                return Ok();
            }
            else {
                return BadRequest();
            }
        
        }

        // DELETE api/<ProfesorController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            if(id == 0)
            {
                return BadRequest();
            }
            else
            {
               var valor = Context.Profesores.FirstOrDefault(x => x.ProfesorId == id);
                if (valor != null)
                {
                    Context.Remove(id);
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
}
