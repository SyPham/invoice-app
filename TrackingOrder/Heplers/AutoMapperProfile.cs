using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TrackingOrder.Dtos;
using TrackingOrder.Entities;

namespace TrackingOrder.Heplers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<InvoiceDto, Invoice>();
            CreateMap<Invoice, InvoiceDto>();
        }
    }
}
