﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TrackingOrder.Data;

namespace TrackingOrder.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20210324062147_InitialDb")]
    partial class InitialDb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.9");

            modelBuilder.Entity("TrackingOrder.Entities.Account", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("BLOB");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("BLOB");

                    b.Property<int>("RoleID")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserName")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("RoleID");

                    b.ToTable("Accounts");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Company", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Container", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ATN")
                        .HasColumnType("TEXT");

                    b.Property<string>("ContainerNo")
                        .HasColumnType("TEXT");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTime")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("DeliveryDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("DeliveryOrder")
                        .HasColumnType("TEXT");

                    b.Property<string>("DeliveryTo")
                        .HasColumnType("TEXT");

                    b.Property<string>("GW")
                        .HasColumnType("TEXT");

                    b.Property<int?>("InvoiceID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("SealNo")
                        .HasColumnType("TEXT");

                    b.Property<string>("Size")
                        .HasColumnType("TEXT");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("InvoiceID");

                    b.ToTable("Containers");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Invoice", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("BLNO")
                        .HasColumnType("TEXT");

                    b.Property<string>("Carrier")
                        .HasColumnType("TEXT");

                    b.Property<int>("CompanyID")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ContainerID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ContainerNo")
                        .HasColumnType("TEXT");

                    b.Property<int>("CreatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("ETA")
                        .HasColumnType("TEXT");

                    b.Property<DateTime?>("ETD")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("InvoiceDate")
                        .HasColumnType("TEXT");

                    b.Property<string>("InvoiceNo")
                        .HasColumnType("TEXT");

                    b.Property<string>("Other1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Other2")
                        .HasColumnType("TEXT");

                    b.Property<string>("StatusCode")
                        .HasColumnType("TEXT");

                    b.Property<int>("UpdatedBy")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("UpdatedTime")
                        .HasColumnType("TEXT");

                    b.Property<string>("VesselName")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("CompanyID");

                    b.ToTable("Invoices");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Role", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Code")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.ToTable("Roles");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Account", b =>
                {
                    b.HasOne("TrackingOrder.Entities.Role", "Role")
                        .WithMany("Accounts")
                        .HasForeignKey("RoleID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsMany("TrackingOrder.Entities.RefreshToken", "RefreshTokens", b1 =>
                        {
                            b1.Property<int>("ID")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("INTEGER");

                            b1.Property<int>("AccountID")
                                .HasColumnType("INTEGER");

                            b1.Property<DateTime>("Created")
                                .HasColumnType("TEXT");

                            b1.Property<string>("CreatedByIp")
                                .HasColumnType("TEXT");

                            b1.Property<DateTime>("Expires")
                                .HasColumnType("TEXT");

                            b1.Property<string>("ReplacedByToken")
                                .HasColumnType("TEXT");

                            b1.Property<DateTime?>("Revoked")
                                .HasColumnType("TEXT");

                            b1.Property<string>("RevokedByIp")
                                .HasColumnType("TEXT");

                            b1.Property<string>("Token")
                                .HasColumnType("TEXT");

                            b1.HasKey("ID");

                            b1.HasIndex("AccountID");

                            b1.ToTable("RefreshTokens");

                            b1.WithOwner()
                                .HasForeignKey("AccountID");
                        });
                });

            modelBuilder.Entity("TrackingOrder.Entities.Container", b =>
                {
                    b.HasOne("TrackingOrder.Entities.Invoice", "Invoice")
                        .WithMany("Containers")
                        .HasForeignKey("InvoiceID");
                });

            modelBuilder.Entity("TrackingOrder.Entities.Invoice", b =>
                {
                    b.HasOne("TrackingOrder.Entities.Company", "Company")
                        .WithMany("Invoices")
                        .HasForeignKey("CompanyID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
