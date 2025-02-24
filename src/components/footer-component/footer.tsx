const Footer = () => {
  return (
    <footer className="bg-footer-background shadow-lg mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Linke Spalte */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-footer-text">Logo</h3>
            <p className="text-sm text-footer-text">
              Ihre Beschreibung hier. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          {/* Mittlere Spalte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-footer-hover text-footer-text">Home</a></li>
              <li><a href="#" className="hover:text-footer-hover text-footer-text">About</a></li>
              <li><a href="#" className="hover:text-footer-hover text-footer-text">Services</a></li>
              <li><a href="#" className="hover:text-footer-hover text-footer-text">Contact</a></li>
            </ul>
          </div>

          {/* Rechte Spalte */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-footer-text">Kontakt</h3>
            <ul className="space-y-2 text-footer-text">
              <li>Email: info@example.com</li>
              <li>Tel: +49 123 456789</li>
              <li>Adresse: Musterstraße 1</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-footer-text">
            © {new Date().getFullYear()} Ihr Unternehmen. Alle Rechte vorbehalten.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
