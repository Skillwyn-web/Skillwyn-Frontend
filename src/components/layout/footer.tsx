const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 py-16 text-gray-400">
      <div className="mx-auto max-w-6xl grid gap-10 px-6 md:grid-cols-4">

        <div>
          <h3 className="text-white font-semibold">DevPath</h3>
          <p className="mt-2 text-sm">
            Building the next generation of top-tier software engineers.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li>Roadmaps</li>
            <li>Courses</li>
            <li>Practice</li>
            <li>Pricing</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li>Blog</li>
            <li>Community</li>
            <li>Cheatsheets</li>
            <li>Success Stories</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>Privacy</li>
            <li>Terms</li>
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
