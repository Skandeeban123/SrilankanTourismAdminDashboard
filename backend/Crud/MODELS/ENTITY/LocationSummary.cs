namespace Crud.MODELS.ENTITY
{
	public class LocationSummary
	{
		public string Location_Name { get; set; }
		public double Average_Rating { get; set; }
		public int Total_Reviews { get; set; }
		public int Total_Positive { get; set; }
		public int Total_Negative { get; set; }
		public int Total_Neutral { get; set; }
		public int Total_Suggestions { get; set; }
	}
}
