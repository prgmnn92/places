/* eslint-disable no-undef */
import eventMarker from "../assets/marker.svg";

export const parseDate = (date) => {
  try {
    const newDate = date.toDate();
    return newDate;
  } catch (error) {
    return date;
  }
};

export const createMarkerWithInfo = (pos, map, event) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let content = `<div class="info-window">
  <h1>${event.title}</h1>
  <p class="text">${event.text}</p>
  <p class="date">${parseDate(event.date).toLocaleDateString(
    "en-EN",
    options
  )}</p>
  <p class="time">from ${("00" + parseDate(event.startTime).getHours()).slice(
    -2
  )}:
  ${("00" + parseDate(event.startTime).getMinutes()).slice(-2)} to 
  ${("00" + parseDate(event.endTime).getHours()).slice(-2)}:
  ${("00" + parseDate(event.endTime).getMinutes()).slice(-2)}</p>
  </div>`;

  let marker = new google.maps.Marker({
    position: pos,
    map: map,
    icon: eventMarker,
  });

  let infowindow = new google.maps.InfoWindow({
    content: content,
    maxWidth: 350,
  });

  google.maps.event.addListener(marker, "click", () => {
    infowindow.open(map, marker);
  });
};
