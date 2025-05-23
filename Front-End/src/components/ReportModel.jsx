import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import API from "../services/api";

const ReportModal = ({ isOpen, onClose, listingId }) => {
  const [selectedReportReason, setSelectedReportReason] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportError, setReportError] = useState("");

  const reportReasons = [
    "Prohibited item",
    "Fraud listing",
    "Incorrect or misleading information",
    "Duplicate listing",
    "Offensive content",
    "Other"
  ];
  const handleReportReasonChange = (reason) => {
    setSelectedReportReason(reason);
  };

  const resetModal = () => {
    setSelectedReportReason("");
    setReportSuccess(false);
    setReportError("");
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const submitReport = () => {
    if (!selectedReportReason) {
      setReportError("Please select a reason for reporting");
      return;
    }

    setIsSubmittingReport(true);
    setReportError("");

    const currentUserId = localStorage.getItem('userId') || 'anonymous';

    const reportData = {
      id: uuidv4(), 
      report_desc: selectedReportReason,
      times_reported: 1,
      report_time: new Date().toISOString(),
      user_id: currentUserId,
      listing_id: listingId
    };

    API.post('/reports', reportData)
      .then(() => {
        setReportSuccess(true);
        setIsSubmittingReport(false);
        setTimeout(() => {
          handleClose();
        }, 2000);
      })
      .catch((error) => {
        console.error("Error submitting report", error);
        setReportError("Failed to submit report. Please try again.");
        setIsSubmittingReport(false);
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-800 rounded-xl w-full max-w-md p-6 border border-gray-700 shadow-2xl animate-fadeIn">
        {reportSuccess ? (
          <div className="text-center py-6">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Report Submitted</h3>
            <p className="text-gray-300 mb-4">Thank you for reporting this listing. We'll review it shortly.</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Report Listing</h3>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-300 mb-6">Please select a reason for reporting this listing:</p>
            
            <div className="space-y-2 max-h-60 overflow-y-auto mb-6">
              {reportReasons.map((reason) => (
                <div 
                  key={reason}
                  onClick={() => handleReportReasonChange(reason)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedReportReason === reason 
                      ? 'bg-cyan-500/20 border border-cyan-500/50' 
                      : 'bg-gray-700/50 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                      selectedReportReason === reason 
                        ? 'border-cyan-400 bg-cyan-500' 
                        : 'border-gray-500'
                    }`}>
                      {selectedReportReason === reason && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-white">{reason}</span>
                  </div>
                </div>
              ))}
            </div>

            {reportError && (
              <div className="bg-red-500/20 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4">
                {reportError}
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={handleClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                disabled={isSubmittingReport}
                className={`px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white font-medium rounded-lg transition-all ${
                  isSubmittingReport ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmittingReport ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Report'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportModal;