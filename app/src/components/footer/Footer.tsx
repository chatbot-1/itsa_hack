const Footer = () => {
  return (
    <footer className="bg-gray-800 py-6">
        <div className="container mx-auto px-6 text-white text-center">
          <p>&copy; {new Date().getFullYear()} MediCare. All Rights Reserved.</p>
        </div>
      </footer>
  )
}

export default Footer