using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TrackingOrder.Migrations
{
    public partial class InitialDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(nullable: true),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Code = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    InvoiceNo = table.Column<string>(nullable: true),
                    Other1 = table.Column<string>(nullable: true),
                    Other2 = table.Column<string>(nullable: true),
                    Carrier = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    VesselName = table.Column<string>(nullable: true),
                    StatusCode = table.Column<string>(nullable: true),
                    ContainerID = table.Column<int>(nullable: true),
                    ContainerNo = table.Column<string>(nullable: true),
                    BLNO = table.Column<string>(nullable: true),
                    CompanyID = table.Column<int>(nullable: false),
                    ETA = table.Column<DateTime>(nullable: true),
                    ETD = table.Column<DateTime>(nullable: true),
                    InvoiceDate = table.Column<DateTime>(nullable: false),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Invoices_Companies_CompanyID",
                        column: x => x.CompanyID,
                        principalTable: "Companies",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Accounts",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    RoleID = table.Column<int>(nullable: false),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Accounts", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Accounts_Roles_RoleID",
                        column: x => x.RoleID,
                        principalTable: "Roles",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Containers",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ContainerNo = table.Column<string>(nullable: true),
                    Size = table.Column<string>(nullable: true),
                    SealNo = table.Column<string>(nullable: true),
                    DeliveryTo = table.Column<string>(nullable: true),
                    DeliveryDate = table.Column<DateTime>(nullable: true),
                    GW = table.Column<string>(nullable: true),
                    ATN = table.Column<string>(nullable: true),
                    DeliveryOrder = table.Column<string>(nullable: true),
                    InvoiceID = table.Column<int>(nullable: true),
                    CreatedTime = table.Column<DateTime>(nullable: false),
                    UpdatedTime = table.Column<DateTime>(nullable: true),
                    CreatedBy = table.Column<int>(nullable: false),
                    UpdatedBy = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Containers", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Containers_Invoices_InvoiceID",
                        column: x => x.InvoiceID,
                        principalTable: "Invoices",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Token = table.Column<string>(nullable: true),
                    Expires = table.Column<DateTime>(nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    CreatedByIp = table.Column<string>(nullable: true),
                    Revoked = table.Column<DateTime>(nullable: true),
                    RevokedByIp = table.Column<string>(nullable: true),
                    ReplacedByToken = table.Column<string>(nullable: true),
                    AccountID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.ID);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_Accounts_AccountID",
                        column: x => x.AccountID,
                        principalTable: "Accounts",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_RoleID",
                table: "Accounts",
                column: "RoleID");

            migrationBuilder.CreateIndex(
                name: "IX_Containers_InvoiceID",
                table: "Containers",
                column: "InvoiceID");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_CompanyID",
                table: "Invoices",
                column: "CompanyID");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_AccountID",
                table: "RefreshTokens",
                column: "AccountID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Containers");

            migrationBuilder.DropTable(
                name: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Accounts");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Roles");
        }
    }
}
