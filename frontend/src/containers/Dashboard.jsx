import React from "react";


const Dashboard = () => {
    return (

        <div>
            <div style={{ display: "flex"}}>
                <input type="url" name="new_page" id="new_page" />
                <button>Scrape</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Total links</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Google product</td>
                        <td>20</td>
                    </tr>
                </tbody>
            </table>
            <div style={{ display: "flex"}}>
                <button>
                    Previous
                </button>
                <button>
                    1
                </button>
                <button>
                    2
                </button>
                <button>
                    3
                </button>
                <button>
                    Next
                </button>
            </div>
        </div> 
    )
}


export default Dashboard;