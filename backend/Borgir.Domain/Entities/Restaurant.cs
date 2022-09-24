using Borgir.Domain.ValueObjects;

namespace Borgir.Domain.Entities;

public class Restaurant
{

    public Guid Id { get; set; }
    public Location Location { get; }
    public RestaurantName Name { get; }

    public Restaurant(Guid id, RestaurantName name, Location location)
    {
        Id = id;
        Name = name;
        Location = location;
    }
}
