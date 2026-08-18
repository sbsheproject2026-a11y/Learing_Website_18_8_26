import React from 'react'

function StudentSupport() {
  return (
    <>

 <div className="resources-section">

    <div className="resources-container">

        {/* Label */}
        <div className="resources-label">
            <span></span>
            RESOURCES
        </div>

        {/* Heading */}
        <h2 className="resources-heading">
            Everything a student needs
        </h2>

        {/* Cards */}
        <div className="resources-grid">

            <div className="resource-card">
                <div className="resource-icon">📄</div>
                <span>Prospectus</span>
            </div>

            <div className="resource-card">
                <div className="resource-icon">🏆</div>
                <span>Results</span>
            </div>

            <div className="resource-card">
                <div className="resource-icon">📚</div>
                <span>Books</span>
            </div>

            <div className="resource-card">
                <div className="resource-icon">📝</div>
                <span>Assignments</span>
            </div>

            <div className="resource-card">
                <div className="resource-icon">❓</div>
                <span>Question Papers</span>
            </div>
 
            
            <div className="resource-card">
                <div className="resource-icon">📋</div>
                <span>Admission Forms</span>
            </div>

        </div>
    </div>


    <style>{`

        .resources-section {
            width: 100%;
            background: #ffffff;
            padding: 58px 0 55px;
        }

        .resources-container {
            width: 1132px;
            max-width: calc(100% - 40px);
            margin: 0 auto;
        }

        /* Orange label */
        .resources-label {
            display: flex;
            align-items: center;
            gap: 9px;
            color: #f39a20;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.8px;
            margin-bottom: 22px;
        }

        .resources-label span {
            width: 25px;
            height: 3px;
            background: #f39a20;
            display: inline-block;
        }

        /* Heading */
        .resources-heading {
            margin: 0 0 34px;
            color: #082e5f;
            font-size: 27px;
            line-height: 1.2;
            font-weight: 600;
        }

        /* Grid */
        .resources-grid {
            display: grid;
            grid-template-columns: repeat(6, 1fr);
            gap: 16px;
        }

        /* Card */
        .resource-card {
            height: 81px;
            border: 1px solid #dfdcd5;
            border-radius: 11px;
            background: #ffffff;

            display: flex;
            align-items: center;

            padding: 0 20px;
            gap: 12px;

            box-sizing: border-box;

            color: #082e5f;
            font-size: 13px;
            font-weight: 600;

            transition: all 0.2s ease;
        }

        .resource-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.06);
        }

        /* Icon box */
        .resource-icon {
            width: 38px;
            height: 38px;
            min-width: 38px;

            display: flex;
            align-items: center;
            justify-content: center;

            background: #f3f0e8;
            border-radius: 9px;

            font-size: 17px;
        }


        /* Tablet */
        @media (max-width: 991px) {

            .resources-container {
                max-width: calc(100% - 40px);
            }

            .resources-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }


        /* Mobile */
        @media (max-width: 575px) {

            .resources-section {
                padding: 40px 0;
            }

            .resources-container {
                max-width: calc(100% - 30px);
            }

            .resources-heading {
                font-size: 23px;
                margin-bottom: 25px;
            }

            .resources-grid {
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .resource-card {
                height: 70px;
            }
        }

    `}</style>

</div>

 

    </>
  )
}

export default StudentSupport