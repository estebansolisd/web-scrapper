import React from "react";
import "./Dashboard.css"; // Import the CSS file

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="search-bar">
                <input type="url" name="new_page" id="new_page" />
                <button>Scrape</button>
            </div>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Total links</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Google product</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
            <div className="pagination">
                <button>Previous</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>Next</button>
            </div>
        </div>
    )
}

export default Dashboard;