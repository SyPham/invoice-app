using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingOrder.Data;
using TrackingOrder.Dtos;
using TrackingOrder.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TrackingOrder.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RolesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<RolesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var data = await _context.Roles.OrderBy(x=> x.ID).ToListAsync();
            return Ok(data);
        }

        // GET api/<RolesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<RolesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Role model)
        {
            try
            {
                _context.Roles.Add(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<RolesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Role model)
        {
            try
            {
                _context.Roles.Update(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<RolesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _context.Roles.FindAsync(id);
            if (item == null) return NotFound();
            try
            {
                _context.Roles.Remove(item);
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
