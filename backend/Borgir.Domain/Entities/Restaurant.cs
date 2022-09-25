namespace Borgir.Domain.Entities;

public class Restaurant
{

    public Guid Id { get; set; }
    public string Name { get; set; }
    public string ImageUrl { get; set; }
    public string City { get; set; }
    public string Country { get; set; }
    public string Street { get; set; }
    public string ZipCode { get; set; }

    public Restaurant(Guid id, string name, string imageUrl, string city, string country, string street, string zipCode)
    {
        Id = id;
        Name = name;
        ImageUrl = imageUrl;
        City = city;
        Country = country;
        Street = street;
        ZipCode = zipCode;
    }
}
