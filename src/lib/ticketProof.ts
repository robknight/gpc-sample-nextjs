import { ticketProofRequest } from "@parcnet-js/ticket-spec";
//"ZeZomy3iAu0A37TrJUAJ+76eYjiB3notl9jiRF3vRJE",
//HZ3Zed6HmpTPJd9uMcEHnfVCG9Gaio3Jj/Ru0Fu3NhA
//"YwahfUdUYehkGMaWh0+q3F8itx2h8mybjPmt8CmTJSs",
export function getTicketProofRequest() {
  return ticketProofRequest({
    classificationTuples: [
      {
        signerPublicKey: "YwahfUdUYehkGMaWh0+q3F8itx2h8mybjPmt8CmTJSs",
        eventId: "5074edf5-f079-4099-b036-22223c0c6995",
      },
    ],
    fieldsToReveal: {
      attendeeEmail: true,
      attendeeName: true,
      eventId: true,
    },
  });
}
