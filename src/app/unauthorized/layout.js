import Navbar from "@/Components/Utils/Navbar/Navbar";
import "../globals.css";

export const metadata = {
      title: "Blog",
      description:
            "A blog platform to share thoughts, ideas, and experiences. Engage with readers, publish articles, and explore diverse content. Join our community today!",
};

const AuthLayout = ({ children }) => {
      return (
            <html>
                  <body>
                        <div>
                              <Navbar />
                              {children}
                        </div>
                  </body>
            </html>
      );
};

export default AuthLayout;
