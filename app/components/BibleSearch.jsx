"use client";

import { useState, useEffect } from "react";

export default function BibleSearch() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setBooks([
      "Genesis",
      "Exodus",
      "Leviticus",
      "Numbers",
      "Deuteronomy",
      "Joshua",
      "Judges",
      "Ruth",
      "1 Samuel",
      "2 Samuel",
      "1 Kings",
      "2 Kings",
      "1 Chronicles",
      "2 Chronicles",
      "Ezra",
      "Nehemiah",
      "Esther",
      "Job",
      "Psalms",
      "Proverbs",
      "Ecclesiastes",
      "Song of Solomon",
      "Isaiah",
      "Jeremiah",
      "Lamentations",
      "Ezekiel",
      "Daniel",
      "Hosea",
      "Joel",
      "Amos",
      "Obadiah",
      "Jonah",
      "Micah",
      "Nahum",
      "Habakkuk",
      "Zephaniah",
      "Haggai",
      "Zechariah",
      "Malachi",
      "Matthew",
      "Mark",
      "Luke",
      "John",
      "Acts",
      "Romans",
      "1 Corinthians",
      "2 Corinthians",
      "Galatians",
      "Ephesians",
      "Philippians",
      "Colossians",
      "1 Thessalonians",
      "2 Thessalonians",
      "1 Timothy",
      "2 Timothy",
      "Titus",
      "Philemon",
      "Hebrews",
      "James",
      "1 Peter",
      "2 Peter",
      "1 John",
      "2 John",
      "3 John",
      "Jude",
      "Revelation",
    ]);

    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const fetchVerse = async (query) => {
    if (!query.trim()) return;
    try {
      const res = await fetch(`https://bible-api.com/${query}?translation=kjv`);
      const data = await res.json();

      if (data.error) {
        setError("Verse not found");
        setResult(null);
      } else {
        setResult(data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching verse");
      setResult(null);
    }
  };

  const handleSearch = () => {
    fetchVerse(searchQuery);
  };

  const handleDropdownSearch = () => {
    if (!selectedBook || !chapter) return;
    const query = `${selectedBook} ${chapter}${verse ? ":" + verse : ""}`;
    fetchVerse(query);
  };

  const formatVerses = (verses) => {
    return verses.map((verse) => (
      <p key={verse.verse} className="mb-2">
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {verse.verse}{" "}
        </span>
        {verse.text}
      </p>
    ));
  };

  return (
   <div className="w-full flex items-center justify-center">
      <div className="m-7 w-fit max-w-7xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-xl rounded-lg p-6 sm:p-8">
        {/* Header & Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Bible Verse Search</h1>
          <button
            className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Manual Search */}
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white"
            placeholder="Enter Book Chapter:Verse (e.g., John 3:16)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white w-full mt-3 p-3 rounded hover:bg-blue-700"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>

        <hr className="my-4 dark:border-gray-700" />

        {/* Dropdown Search */}
        <h2 className="text-lg font-semibold mb-3">Select Book & Chapter</h2>
        <select
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-3"
          onChange={(e) => setSelectedBook(e.target.value)}
          value={selectedBook}
        >
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book} value={book}>
              {book}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-3"
          placeholder="Enter Chapter (e.g., 3)"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />

        <input
          type="text"
          className="w-full p-3 border rounded bg-gray-100 dark:bg-gray-700 dark:text-white mb-3"
          placeholder="Enter Verse (Optional)"
          value={verse}
          onChange={(e) => setVerse(e.target.value)}
        />

        <button
          className="bg-blue-600 text-white w-full p-3 rounded hover:bg-blue-700"
          onClick={handleDropdownSearch}
        >
          Get Verse
        </button>

        {error && <p className="text-red-500 mt-3">{error}</p>}

        {result && (
          <div className="mt-5 p-4 border rounded bg-gray-100 dark:bg-gray-800">
            <h2 className="text-xl font-semibold">{result.reference}</h2>
            <div className="mt-3">{formatVerses(result.verses)}</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Translation: KJV
            </p>
          </div>
        )}
      </div>
      </div>
  );
}
