using System;

using System.Data.SqlClient;
using Microsoft.Data.Sqlite;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;


namespace DefaultNamespace;


public class DatabaseUtil
{
    public static async Task<List<Dictionary<string, object>>> GetResultsFromQueryFile(AppDbContext context, IWebHostEnvironment environment, string queryPath)
    {
        string sqlFilePath = $"{environment.ContentRootPath}/{queryPath}";
        // string sqlFilePath = $"{_environment.ContentRootPath}/sql/averageDailyPrice.sql";
        string sqlQuery = await System.IO.File.ReadAllTextAsync(sqlFilePath);
        SqliteConnection sqlConnection = (SqliteConnection)context.Database.GetDbConnection();
        sqlConnection.Open();

        List<Dictionary<string, object>> results = new List<Dictionary<string, object>>();

        using (SqliteCommand command = new SqliteCommand(sqlQuery, sqlConnection))
        {
            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Dictionary<string, object> row = new Dictionary<string, object>();
        
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    string columnName = reader.GetName(i);
                    object value = reader.GetValue(i);
                    row[columnName] = value;
                }
        
                results.Add(row);
            }
            reader.Close();
        }
        sqlConnection.Close();
        return results;
    }
    
    public static async Task<List<Dictionary<string, object>>> GetResultsFromRawQuery(AppDbContext context, IWebHostEnvironment environment, string sqlQuery)
    {
        SqliteConnection sqlConnection = (SqliteConnection)context.Database.GetDbConnection();
        sqlConnection.Open();

        List<Dictionary<string, object>> results = new List<Dictionary<string, object>>();

        using (SqliteCommand command = new SqliteCommand(sqlQuery, sqlConnection))
        {
            SqliteDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                Dictionary<string, object> row = new Dictionary<string, object>();
        
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    string columnName = reader.GetName(i);
                    object value = reader.GetValue(i);
                    row[columnName] = value;
                }
        
                results.Add(row);
            }
            reader.Close();
        }
        sqlConnection.Close();
        return results;
    }

}