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
    public class ContainersController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public ContainersController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<ContainersController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var data = await _context.Containers.OrderByDescending(x => x.CreatedTime).ToListAsync();

         
            return Ok(data);
        }

        [HttpGet("GetContainerByInvoiceId/{invoiceId}")]
        public async Task<ActionResult> GetContainerByInvoiceId(int invoiceId)
        {
            var data = await _context.Containers.Where(x=> x.InvoiceID == invoiceId).OrderByDescending(x => x.CreatedTime).ToListAsync();
            return Ok(data);
        }

        // GET api/<ContainersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ContainersController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Container model)
        {
            try
            {
                model.DeliveryDate = model.DeliveryDate.Value.ToLocalTime();
                model.CreatedTime = DateTime.Now;
                _context.Containers.Add(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<ContainersController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Container model)
        {
            try
            {
                model.UpdatedTime = DateTime.Now;
                _context.Containers.Update(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<ContainersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _context.Containers.FindAsync(id);
            if (item == null) return NotFound();
            try
            {
                _context.Containers.Remove(item);
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
