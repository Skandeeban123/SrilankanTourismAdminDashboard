using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Net.Http;
using System.Text;
using System.Text.Json;

namespace Crud.Services
{
	public class GeminiService
	{
		private readonly HttpClient _httpClient;
		private readonly string _apiKey;

		public GeminiService(IConfiguration config)
		{
			_httpClient = new HttpClient();
			_apiKey = config["Gemini:ApiKey"];

			Console.WriteLine("Gemini API Key Loaded: " + (_apiKey != null));
		}

		public async Task<string> GenerateSolutionAsync(string reviewText, string sentiment)
		{

			var modelName = "models/gemini-2.5-pro";
			var url = $"https://generativelanguage.googleapis.com/v1/{modelName}:generateContent?key={_apiKey}";


			var prompt =
				$"You are a tourism management assistant. " +
				$"A tourist left a {sentiment} review: \"{reviewText}\". " +
				$"Provide a short, actionable solution for tourism authorities.";

			var requestBody = new
			{
				contents = new[]
				{
					new
					{
						parts = new[]
						{
							new { text = prompt }
						}
					}
				}
			};

			var json = JsonSerializer.Serialize(requestBody);
			var content = new StringContent(json, Encoding.UTF8, "application/json");

			HttpResponseMessage response;

			try
			{
				response = await _httpClient.PostAsync(url, content);
			}
			catch (Exception ex)
			{
				Console.WriteLine("HTTP REQUEST FAILED: " + ex.Message);
				throw;
			}

			if (!response.IsSuccessStatusCode)
			{
				var error = await response.Content.ReadAsStringAsync();
				Console.WriteLine("===== GEMINI ERROR BODY =====");
				Console.WriteLine(error);
				Console.WriteLine("===== END GEMINI ERROR =====");
				throw new Exception(error);
			}

			var responseJson = await response.Content.ReadAsStringAsync();
			using var doc = JsonDocument.Parse(responseJson);

			return doc
				.RootElement
				.GetProperty("candidates")[0]
				.GetProperty("content")
				.GetProperty("parts")[0]
				.GetProperty("text")
				.GetString();
		}
	}
}