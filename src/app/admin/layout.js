export const metadata = {
      title: "Admin Profile ",
      description:
            "A blog platform to share thoughts, ideas, and experiences. Engage with readers, publish articles, and explore diverse content. Join our community today!",
};

const ProfileLayout = ({ children }) => {
      return (
            <html>
                  <body>
                        <div>
                              <h1>Admin Profile Layout</h1>
                              {children}
                        </div>
                  </body>
            </html>
      );
};

export default ProfileLayout;
