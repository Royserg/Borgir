namespace Borgir.Domain.ValueObjects;


public record RestaurantName
{
    public string Value { get; }

    public RestaurantName(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be null or whitespace.");
        }

        Value = value;
    }

    public static implicit operator string(RestaurantName name) => name.Value;

    public static implicit operator RestaurantName(string name) => new(name);
}
