using AutoMapper;
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
    public class InvoicesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public InvoicesController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/<InvoicesController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var model = from i in _context.Invoices
                        join co in _context.Companies on i.CompanyID equals co.ID
                        join t in _context.Containers on i.ContainerID equals t.ID into cot
                        from ct in cot.DefaultIfEmpty()
                        select new
                        {
                            ID = i.ID,
                            InvoiceNo = i.InvoiceNo,
                            Other1 = i.Other1,
                            Other2 = i.Other2,
                            Carrier = i.Carrier,

                            Description = i.Description,
                            VesselName = i.VesselName,

                            StatusCode = i.StatusCode,
                            ContainerID = i.ContainerID,
                            ContainerNo = i.ContainerNo, // bien so xe
                            BLNO = i.BLNO,
                            CompanyID = i.CompanyID,

                            ETA = i.ETA,
                            ETD = i.ETD,
                            InvoiceDate = i.InvoiceDate,
                            UpdatedTime = i.UpdatedTime,
                            CreatedBy = i.CreatedBy,
                            UpdatedBy = i.UpdatedBy,
                            ContainerCode = ct.ContainerNo,
                            CompanyName = co.Name
                        };

            var data = await model.ToListAsync();
            return Ok(data);
        }

        // GET api/<ContainersController>/5
        [HttpGet("{invoiceId}")]
        public async Task<ActionResult> Get(int invoiceId)
        {


            var data = await _context.Invoices.FirstOrDefaultAsync(x => x.ID == invoiceId);
            return Ok(data);
        }

        [HttpGet("filter")]
        public async Task<ActionResult> Filter(string invoiceNo ="", int? companyID = 0, string status = "" )
        {
            var data = _context.Invoices.Include(x=>x.Container);
            var result = new List<Invoice>();
            if (companyID > 0 && status == "" )
            {
                result = await data.Where(x => x.CompanyID == companyID ).ToListAsync();
            } else if (companyID > 0 && status != "" ) {
                result = await data.Where(x => x.CompanyID == companyID && x.StatusCode.Equals(status)).ToListAsync();
            }
            else {
                result = await data.Where(x => x.InvoiceNo.Equals(invoiceNo)).ToListAsync();
            }
            return Ok(result);
        }


        // POST api/<InvoicesController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Invoice model)
        {
            try
            {
                model.InvoiceDate = DateTime.Now;
                _context.Invoices.Add(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        // PUT api/<InvoicesController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Invoice model)
        {
            try
            {
                model.UpdatedTime = DateTime.Now;
                var item = await _context.Invoices.AsNoTracking().FirstOrDefaultAsync(x=> x.ID == id);
                if (item == null) return NotFound();
                _context.Invoices.Update(model);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<InvoicesController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var item = await _context.Invoices.FindAsync(id);
            if (item == null) return NotFound();
            try
            {
                _context.Invoices.Remove(item);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("CreateContainerByInvoiceID")]
        public async Task<ActionResult> CreateContainerByInvoiceID(int invoiceID, [FromBody] Container model)
        {
            try
            {
                var item = await _context.Invoices.FindAsync(invoiceID);
                if (item == null) return NotFound();

                await _context.Containers.AddAsync(model);
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
