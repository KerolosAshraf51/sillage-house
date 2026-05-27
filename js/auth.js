// Auth Service for Sillage House
const AuthService = {
  // Hardcoded Admin Credentials
  adminEmail: "sillagehouse1@gmail.com",
  adminPass: "sillagehouse123",
  
  login: function(email, password) {
    if (email === this.adminEmail && password === this.adminPass) {
      sessionStorage.setItem('sillage_admin_logged_in', 'true');
      return true;
    }
    return false;
  },
  
  logout: function() {
    sessionStorage.removeItem('sillage_admin_logged_in');
    window.location.href = 'login.html';
  },
  
  isAuthenticated: function() {
    return sessionStorage.getItem('sillage_admin_logged_in') === 'true';
  },
  
  requireAuth: function() {
    if (!this.isAuthenticated()) {
      window.location.href = 'login.html';
    }
  },
  
  redirectIfAuthenticated: function() {
    if (this.isAuthenticated()) {
      window.location.href = 'admin.html';
    }
  }
};
