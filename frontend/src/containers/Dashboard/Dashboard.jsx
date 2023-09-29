import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const { websites, createWebSites, fetchWebSites, user } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState("");
  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentWebSites = websites.slice(start, end);
  const totalPages = Math.ceil(websites.length / itemsPerPage);

  useEffect(() => {
    if(!user) return;
    fetchWebSites();
  }, [user]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleItemClick = (index) => {
    setCurrentPage(index + 1);
  };

  const handleSubmit = e => {
    e.preventDefault();

    createWebSites(url);
    setUrl("");
  }

  return (
    <div className="dashboard-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input value={url} onChange={e => setUrl(e.target.value)} type="url" name="new_page" id="new_page" />
        <button type="submit">Scrape</button>
      </form>
      <p>IMPORTANT: Some URLs may fail because of some anti scraping walls</p>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total links</th>
          </tr>
        </thead>
        <tbody>
         {currentWebSites.length ? (
            currentWebSites.map((currentWebSite) => (
                <tr key={currentWebSite.id}>
                    <td>{currentWebSite.name}</td>
                    <td>{currentWebSite.WebsiteLinks.length}</td>
                </tr>
            ))
         ): (
            <tr>
                <td colSpan="2" style={{padding: 20}}>No items available</td>
            </tr>
         )}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        {[...Array(totalPages).keys()].map((index) => (
          <button key={index} onClick={() => handleItemClick(index)}>
            {index + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage >= websites.length -1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
