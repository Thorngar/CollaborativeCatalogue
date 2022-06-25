namespace CollaborativeCatalogue.Data.Providers.Sql
{
    public class ConnectedUser
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public int Role { get; set; }
    }
}