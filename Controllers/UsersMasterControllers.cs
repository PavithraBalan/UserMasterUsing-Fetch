using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MasterDetails.Models;

namespace MasterDetails.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersMasterControllers : ControllerBase
    {
        private readonly MasterDBContext _context;

        public UsersMasterControllers(MasterDBContext context)
        {
            _context = context;
        }

        // GET: api/UsersMasterControllers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UsersMaster>>> GetUsersDetails()
        {
            return await _context.UsersDetails.ToListAsync();
        }

        // GET: api/UsersMasterControllers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UsersMaster>> GetUsersMaster(long id)
        {
            var usersMaster = await _context.UsersDetails.FindAsync(id);

            if (usersMaster == null)
            {
                return NotFound();
            }

            return usersMaster;
        }

        // PUT: api/UsersMasterControllers/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsersMaster(long id, UsersMaster usersMaster)
        {
            if (id != usersMaster.Id)
            {
                return BadRequest();
            }

            _context.Entry(usersMaster).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersMasterExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UsersMasterControllers
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UsersMaster>> PostUsersMaster(UsersMaster usersMaster)
        {
            _context.UsersDetails.Add(usersMaster);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsersMaster", new { id = usersMaster.Id }, usersMaster);
        }

        // DELETE: api/UsersMasterControllers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UsersMaster>> DeleteUsersMaster(long id)
        {
            var usersMaster = await _context.UsersDetails.FindAsync(id);
            if (usersMaster == null)
            {
                return NotFound();
            }

            _context.UsersDetails.Remove(usersMaster);
            await _context.SaveChangesAsync();

            return usersMaster;
        }

        private bool UsersMasterExists(long id)
        {
            return _context.UsersDetails.Any(e => e.Id == id);
        }
    }
}
