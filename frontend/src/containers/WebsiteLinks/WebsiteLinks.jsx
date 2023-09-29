import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./WebsiteLinks.css"; // Import the CSS file

const WebsiteLinks = () => {
  const { websiteId } = useParams();
  const { websites, fetchWebSites, user } = useAuth();
  console.log(websites, "websites");
  const rawWebsite = websites.find((website) => website.id === Number(websiteId)) ?? {};
  const { WebsiteLinks = [], name = "Name not available" } = rawWebsite;
  console.log(rawWebsite, "rawWebsite");
  console.log(websiteId, "websiteId");
  console.log(rawWebsite.WebsiteLinks, "rawWebsite.Websitelinks");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentWebsiteLinks = WebsiteLinks.slice(start, end);
  const totalPages = Math.ceil(WebsiteLinks.length / itemsPerPage);

  

  useEffect(() => {
    if (!user) return;
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

  return (
    <div className="WebsiteLinks-container">
      <Link to="/websites">{"< Go back"}</Link>
      <h1 style={{ textAlign: "center"}}>{name}</h1>
      <div style={{height: 500, overflow: "auto"}}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {currentWebsiteLinks.length ? (
              currentWebsiteLinks.map((websiteLink) => (
                <tr key={websiteLink.id}>
                  <td>{websiteLink.name}</td>
                  <td>{websiteLink.url}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ padding: 20 }}>
                  No items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
        </div>
        <div style={{display:"flex", flexWrap: "wrap", maxWidth: 400, justifyContent: "center", alignItems: 'center'}}>
          {[...Array(totalPages).keys()].map((index) => (
            <button key={index} onClick={() => handleItemClick(index)}>
              {index + 1}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={handleNextPage}
            disabled={currentPage >= websites.length - 1}
          >
            Next
          </button>

        </div>
      </div>
    </div>
  );
};

export default WebsiteLinks;
