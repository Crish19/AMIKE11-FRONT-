import BookingWidget from "../components/BookingWidget";

function TestPage() {
  return (
    <div style={{ display: 'flex', minHeight: '150vh' }}> {/* Ensure enough height for scrolling */}
      <div style={{ flex: '1', padding: '20px' }}>
        {/* Mock content to simulate the rest of the page */}
        <p>Some content here...</p>
        {/* Repeat or add more content to ensure the page is scrollable */}
      </div>

      <div style={{ position: 'fixed', right: '0', bottom: '0', padding: '20px' }}> {/* Simulate the column for the widget */}
  <div className="sticky-widget">
    <BookingWidget />
  </div>
</div>
    </div>
  );
}

export default TestPage;