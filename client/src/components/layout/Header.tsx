import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/theme-toggle";
import { authService } from "@/services/authService";
import { Phone } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Phone className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
            BPO Automation
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-6 mr-4">
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
        
          </nav>
          <ModeToggle />
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-200 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 transition-colors"
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}