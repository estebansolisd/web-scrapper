import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const { websites, createWebSites, fetchWebSites } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [url, setUrl] = useState("");
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWebSites = websites.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    fetchWebSites();
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleItemClick = (index) => {
    setCurrentPage(Math.floor(index / itemsPerPage) + 1);
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
        {currentWebSites.map((item, index) => (
          <button key={index} onClick={() => handleItemClick(index)}>
            {index + 1}
          </button>
        ))}
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button
          onClick={handleNextPage}
          disabled={indexOfLastItem >= websites.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
