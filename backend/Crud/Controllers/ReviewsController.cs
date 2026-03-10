using Crud.MODELS;
using Crud.MODELS.ENTITY;
using Crud.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Crud.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class ReviewsController : ControllerBase
	{


		private readonly string _csvPath = "location_summary.csv";


		private readonly GeminiService _geminiService;

		public ReviewsController(GeminiService geminiService)
		{
			_geminiService = geminiService;
			Console.WriteLine("Gemini Service Loaded");
		}

		[HttpGet("locations")]
		public IActionResult GetLocations()
		{
			
			var locations = System.IO.File.ReadAllLines(_csvPath)
				.Skip(1)
				.Select(line => line.Split(','))
				.Select(cols => new LocationSummary
				{
					Location_Name = cols[0],
					Average_Rating = double.Parse(cols[1]),
					Total_Reviews = int.Parse(cols[2]),
					Total_Positive = int.Parse(cols[3]),
					Total_Negative = int.Parse(cols[4]),
					Total_Neutral = int.Parse(cols[5]),
					Total_Suggestions = int.Parse(cols[6])
				}).ToList();

			return Ok(locations);
		}
		//[HttpGet("all-reviews")]
		//public IActionResult GetAllReviews(int page = 1, int pageSize = 12)
		//{
		//	try
		//	{
		//		var filePath = "processed_reviews_full.csv";
		//		if (!System.IO.File.Exists(filePath)) return NotFound();

		//		// 1. Read all lines
		//		var allLines = System.IO.File.ReadAllLines(filePath).Skip(1).ToList();

		//		// 2. Apply Pagination logic first (to avoid processing 17k lines every time)
		//		var pagedLines = allLines
		//			.Skip((page - 1) * pageSize)
		//			.Take(pageSize)
		//			.ToList();

		//		var reviews = pagedLines.Select(line =>
		//		{
		//			// Use Regex to handle commas inside the text fields
		//			var cols = Regex.Split(line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");

		//			// Safe index check
		//			if (cols.Length < 11) return null;

		//			return new
		//			{
		//				Location = cols[0].Trim('"'),
		//				UserLocation = cols[2].Trim('"'),
		//				Rating = cols[5].Trim('"'),
		//				Text = cols[6].Trim('"'),
		//				Sentiment = cols[7].Trim('"'),
		//				Solution = cols[9].Trim('"'), // Column 9 is Generated_Solution
		//				UserName = cols[10].Trim('"') // Column 10 is User_Name
		//			};
		//		})
		//		.Where(r => r != null)
		//		.ToList();

		//		return Ok(new
		//		{
		//			TotalCount = allLines.Count,
		//			Page = page,
		//			PageSize = pageSize,
		//			Data = reviews
		//		});
		//	}
		//	catch (Exception ex)
		//	{
		//		return StatusCode(500, ex.Message);
		//	}
		//}

		//[HttpGet("all-reviews")]
		//public IActionResult GetAllReviews([FromQuery] int page = 1, [FromQuery] int pageSize = 12)
		//{
		//	try
		//	{
		//		var filePath = "processed_reviews_full.csv";
		//		if (!System.IO.File.Exists(filePath)) return NotFound();

		//		// 1. Load all lines and filter out empty ones
		//		var allLines = System.IO.File.ReadAllLines(filePath).Skip(1)
		//			.Where(line => !string.IsNullOrWhiteSpace(line));

		//		// 2. Map ALL lines to objects FIRST (to filter out malformed data)
		//		var allReviews = allLines.Select(line =>
		//		{
		//			var cols = Regex.Split(line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
		//			if (cols.Length < 11) return null; // Skip if columns are missing

		//			return new
		//			{
		//				Location = cols[0].Trim('"'),
		//				UserLocation = cols[2].Trim('"'),
		//				Rating = cols[5].Trim('"'),
		//				Text = cols[6].Trim('"'),
		//				Sentiment = cols[7].Trim('"'),
		//				Solution = cols[9].Trim('"'),
		//				UserName = cols[10].Trim('"')
		//			};
		//		})
		//		.Where(r => r != null) // Keep only valid objects
		//		.ToList();

		//		// 3. NOW apply pagination on the valid list
		//		var pagedData = allReviews
		//			.Skip((page - 1) * pageSize)
		//			.Take(pageSize)
		//			.ToList();

		//		return Ok(new
		//		{
		//			TotalCount = allReviews.Count,
		//			Page = page,
		//			PageSize = pageSize,
		//			Data = pagedData
		//		});
		//	}
		//	catch (Exception ex)
		//	{
		//		return StatusCode(500, ex.Message);
		//	}
		//}


		//	[HttpGet("all-reviews")]
		//	public IActionResult GetAllReviews(
		//[FromQuery] int page = 1,
		//[FromQuery] int pageSize = 12,
		//[FromQuery] string? location = null,
		//[FromQuery] string? sentiment = null,
		//[FromQuery] int? rating = null)
		//	{
		//		try
		//		{
		//			var filePath = "processed_reviews_full.csv";
		//			if (!System.IO.File.Exists(filePath)) return NotFound();

		//			var allLines = System.IO.File.ReadAllLines(filePath).Skip(1)
		//				.Where(line => !string.IsNullOrWhiteSpace(line));

		//			var allReviews = allLines.Select(line =>
		//			{
		//				var cols = Regex.Split(line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
		//				if (cols.Length < 11) return null;
		//				return new
		//				{
		//					Location = cols[0].Trim('"'),
		//					UserLocation = cols[2].Trim('"'),
		//					Rating = cols[5].Trim('"'),
		//					Text = cols[6].Trim('"'),
		//					Sentiment = cols[7].Trim('"'),
		//					Solution = cols[9].Trim('"'),
		//					UserName = cols[10].Trim('"')
		//				};
		//			}).Where(r => r != null);

		//			// --- APPLY FILTERS ---
		//			if (!string.IsNullOrEmpty(location))
		//				allReviews = allReviews.Where(r => r.Location.Equals(location, StringComparison.OrdinalIgnoreCase));

		//			if (!string.IsNullOrEmpty(sentiment))
		//				allReviews = allReviews.Where(r => r.Sentiment.Equals(sentiment, StringComparison.OrdinalIgnoreCase));

		//			if (rating.HasValue)
		//				allReviews = allReviews.Where(r => r.Rating == rating.Value.ToString());

		//			var filteredList = allReviews.ToList();

		//			// --- PAGINATION ---
		//			var pagedData = filteredList
		//				.Skip((page - 1) * pageSize)
		//				.Take(pageSize)
		//				.ToList();

		//			return Ok(new
		//			{
		//				TotalCount = filteredList.Count,
		//				Page = page,
		//				Data = pagedData
		//			});
		//		}
		//		catch (Exception ex)
		//		{
		//			return StatusCode(500, ex.Message);
		//		}
		//	}

		[HttpGet("all-reviews")]
		public IActionResult GetAllReviews(
	[FromQuery] int page = 1,
	[FromQuery] int pageSize = 12,
	[FromQuery] string? location = null,
	[FromQuery] string? sentiment = null,
	[FromQuery] int? rating = null)
		{
			try
			{
				var filePath = "processed_reviews_full.csv";
				if (!System.IO.File.Exists(filePath))
					return NotFound("CSV file not found");

				var allLines = System.IO.File.ReadAllLines(filePath)
					.Skip(1) // Skip header
					.Where(line => !string.IsNullOrWhiteSpace(line))
					.Select((line, index) => new { line, index }); // keep index for ordering

				var allReviews = allLines.Select(x =>
				{
					var cols = Regex.Split(x.line, ",(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)");
					if (cols.Length < 11) return null;

					return new
					{
						Location = cols[0].Trim('"'),
						UserLocation = cols[2].Trim('"'),
						Rating = cols[5].Trim('"'),
						Text = cols[6].Trim('"'),
						Sentiment = cols[7].Trim('"'),
						Solution = cols[9].Trim('"'),
						UserName = cols[10].Trim('"'),
						Index = x.index // used for descending order
					};
				}).Where(r => r != null);

				// ---------- FILTERS ----------
				if (!string.IsNullOrEmpty(location))
					allReviews = allReviews.Where(r =>
						r.Location.Equals(location, StringComparison.OrdinalIgnoreCase));

				if (!string.IsNullOrEmpty(sentiment))
					allReviews = allReviews.Where(r =>
						r.Sentiment.Equals(sentiment, StringComparison.OrdinalIgnoreCase));

				if (rating.HasValue)
					allReviews = allReviews.Where(r =>
						r.Rating == rating.Value.ToString());

				// ---------- DESCENDING ORDER (NEWEST FIRST) ----------
				var orderedReviews = allReviews
					.OrderByDescending(r => r.Index)
					.ToList();

				// ---------- PAGINATION ----------
				var pagedData = orderedReviews
					.Skip((page - 1) * pageSize)
					.Take(pageSize)
					.Select(r => new
					{
						r.Location,
						r.UserLocation,
						r.Rating,
						r.Text,
						r.Sentiment,
						r.Solution,
						r.UserName
					})
					.ToList();

				return Ok(new
				{
					TotalCount = orderedReviews.Count,
					Page = page,
					PageSize = pageSize,
					Data = pagedData
				});
			}
			catch (Exception ex)
			{
				return StatusCode(500, ex.Message);
			}
		}


		//[HttpPost("submit")]
		//public IActionResult SubmitReview([FromBody] NewReviewDto dto)
		//{
		//	var filePath = "processed_reviews_full.csv";

		//	// 1. Determine Sentiment based on Rating
		//	string sentiment = dto.Rating >= 4 ? "Positive" : (dto.Rating <= 2 ? "Negative" : "Neutral");

		//	// 2. Determine "Generated Solution" (Logic-based)
		//	string solution = "Maintain quality service.";
		//	string txt = dto.Text.ToLower();
		//	if (txt.Contains("dirty") || txt.Contains("clean")) solution = "Action: Improve sanitation protocols immediately.";
		//	else if (txt.Contains("slow") || txt.Contains("wait")) solution = "Action: Increase staff during peak hours.";
		//	else if (sentiment == "Negative") solution = "Action: Manager to contact guest for recovery.";

		//	// 3. Prepare CSV Line (Handling commas/quotes)
		//	string userName = "User_" + Guid.NewGuid().ToString().Substring(0, 5);
		//	string newLine = $"\"{dto.Location_Name}\",\"New\",\"{dto.User_Location}\",\"en_US\",\"{DateTime.Now:yyyy-MM}\",{dto.Rating},\"{dto.Text.Replace("\"", "'")}\",\"{sentiment}\",\"False\",\"{solution}\",\"{userName}\"";

		//	try
		//	{
		//		// Append to CSV
		//		System.IO.File.AppendAllLines(filePath, new[] { newLine });
		//		return Ok(new { message = "Review saved successfully!", userName });
		//	}
		//	catch (Exception ex)
		//	{
		//		return StatusCode(500, "Error saving to CSV: " + ex.Message);
		//	}
		//}

		[HttpPost("submit")]
		public async Task<IActionResult> SubmitReview([FromBody] NewReviewDto dto)
		{
			var filePath = "processed_reviews_full.csv";

			// 1. Sentiment from rating
			string sentiment = dto.rating >= 4
				? "Positive"
				: dto.rating <= 2
					? "Negative"
					: "Neutral";

			// 2. Gemini AI generates solution
			string solution;
			try
			{
				solution = await _geminiService.GenerateSolutionAsync(dto.text, sentiment);
			}
			catch 
			{
				solution = "Action: Review requires manual follow-up.";
				//return StatusCode(500, ex.Message);
			}

			// 3. CSV-safe formatting
			string userName = "User_" + Guid.NewGuid().ToString()[..5];

			string newLine =
				$"\"{dto.location}\"," +
				$"\"New\"," +
				$"\"{dto.userLocation}\"," +
				$"\"en_US\"," +
				$"\"{DateTime.Now:yyyy-MM}\"," +
				$"{dto.rating}," +
				$"\"{dto.text.Replace("\"", "'")}\"," +
				$"\"{sentiment}\"," +
				$"\"False\"," +
				$"\"{solution.Replace("\"", "'")}\"," +
				$"\"{userName}\"";

			try
			{
				System.IO.File.AppendAllLines(filePath, new[] { newLine });
				return Ok(new { message = "Review saved with AI solution!", solution });
			}
			catch (Exception ex)
			{
				return StatusCode(500, ex.Message);
			}
		}
	}
}
