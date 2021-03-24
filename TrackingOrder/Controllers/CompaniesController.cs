using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingOrder.Data;
using TrackingOrder.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrackingOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly DataContext _context;

        public CompaniesController(DataContext context)
        {
            _context = context;
        }

        // GET: api/<CompaniesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var data = await _context.Companies.OrderByDescending(x=> x.CreatedTime).ToListAsync();
            return Ok(data);
        }

        // GET api/<CompaniesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CompaniesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Company model)
        {
            try
            {
                model.CreatedTime = DateTime.Now;
                _context.Companies.Add(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<CompaniesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Company model)
        {
            try
            {
                model.UpdatedTime = DateTime.Now;
                _context.Companies.Update(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<CompaniesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _context.Companies.FindAsync(id);
            if (item == null) return NotFound();
            try
            {
                _context.Companies.Remove(item);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
