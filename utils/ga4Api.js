// utils/ga4Api.js

import axios from "axios";

const getPropertyData = async () => {
  try {
    const propertyId = "405084381"; // Ganti dengan ID properti GA4 Anda
    const dateRange = {
      startDate: "2023-08-01",
      endDate: "2023-09-31",
    };
    const metrics = "users"; // Anda dapat mengganti dengan metrik lain yang Anda butuhkan

    const apiUrl = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunPivotReports`;

    const requestData = {
      entity: {
        propertyId: propertyId,
      },
      dateRanges: [
        {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
      ],
      dimensions: [
        {
          name: "date",
        },
      ],
      metrics: [
        {
          name: metrics,
        },
      ],
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        Authorization: `Bearer ya29.a0AfB_byAHlPPLik5Y_sHVWWlD8sWPrze950Uu5C1rdcx6yQ23wedzaOPE7PenSVGrXmeaybCqNvhzpsH5PugwJ6SBFxYjJ69Eajyiw3iq1yxgYaMGrLNDmiC-EeNl2AKu4Bbe5d18UXDK6OR5oMpWqX06ucD8JkB6njnbgTpVaCgYKAdkSARMSFQHsvYlsgBhFV6EWQSgiCUbaKQAE3Q0175`, // Anda dapat menyimpan token di variabel lingkungan (environment variable)
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Gagal mengambil data dari GA4: " + error.message);
  }
};

export default getPropertyData;
