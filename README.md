# 🚗 SafarSure - AI-Powered Tourist Safety Platform

A comprehensive tourist safety platform that leverages AI, real-time monitoring, and blockchain technology to ensure secure and worry-free travel experiences for tourists worldwide.

## 🌟 Features

### 🛡️ Tourist Safety Features
- **Digital Tourist ID**: Secure blockchain-based identity registration
- **Real-time Location Tracking**: Live GPS monitoring with safety alerts
- **Emergency SOS Button**: One-tap emergency response system
- **Geo-fencing Alerts**: Automatic notifications for restricted areas
- **AI-Powered Anomaly Detection**: Smart monitoring for unusual activity patterns

### 📊 Authority Dashboard
- **Live Safety Map**: Real-time tourist positioning and incident visualization
- **Tourist Management**: Comprehensive tourist registration and monitoring
- **Incident Management**: Log and track safety incidents with severity levels
- **Analytics Overview**: Safety scores, active alerts, and system status monitoring

### 💳 Flexible Payment Plans
- **Free Tier**: Basic safety features for individual tourists
- **Pro Plan**: Enhanced tracking and family safety features
- **Enterprise Package**: Group safety with advanced AI monitoring

## 🏗️ Project Structure

```
SafarSure/
├── index.html              # Main application interface
├── payment.html            # Payment plans page
├── server.js               # Backend API server
├── anomaly.js              # AI anomaly detection service
├── simulate.js             # Demo data simulation
└── serviceAccountKey.json  # Firebase configuration (gitignored)
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- Firebase Project with Realtime Database
- Modern web browser with geolocation support

### Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/ApurbaHalder-hub/SafarSure.git
cd SafarSure
```

2. **Install dependencies**
```bash
npm install express cors body-parser dotenv firebase-admin ethers axios
```

3. **Firebase Configuration**
   - Create a Firebase project
   - Enable Realtime Database
   - Download `serviceAccountKey.json` and place it in the project root
   - Update Firebase configuration in `server.js`

4. **Environment Setup**
```bash
# Create .env file
cp .env.example .env

# Configure your environment variables
FIREBASE_SERVICE_ACCOUNT=./serviceAccountKey.json
ETH_PROVIDER_URL=your_ethereum_provider_url
PRIVATE_KEY=your_wallet_private_key
CONTRACT_ADDRESS=your_smart_contract_address
CONTRACT_ABI_PATH=./contractABI.json
PORT=4000
```

5. **Start the Application**
```bash
# Start backend server
node server.js

# Start anomaly detection service (in separate terminal)
node anomaly.js

# Open index.html in your browser or serve via:
python -m http.server 8000
```

## 🛠️ Tech Stack

### Frontend
- **HTML5/CSS3**: Modern responsive design
- **Tailwind CSS**: Utility-first CSS framework
- **JavaScript ES6+**: Client-side functionality
- **Leaflet.js**: Interactive maps
- **SweetAlert2**: Beautiful alert modals

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web application framework
- **Firebase Realtime Database**: Real-time data synchronization
- **Ethereum Blockchain**: Smart contract integration

### AI & Monitoring
- **Anomaly Detection**: Real-time pattern analysis
- **Geo-fencing**: Location-based safety zones
- **Real-time Alerts**: Instant notification system

## 📱 Usage Guide

### For Tourists
1. **Register**: Create a digital tourist ID with passport details
2. **Plan Trip**: Enter destination, duration, and group size
3. **Stay Protected**: Use SOS button for emergencies
4. **Real-time Monitoring**: Authorities monitor your safety automatically

### For Authorities
1. **Dashboard Access**: Monitor all registered tourists
2. **Live Map View**: Track tourist locations in real-time
3. **Incident Management**: Respond to safety alerts promptly
4. **Analytics**: View safety metrics and system status

## 🔧 API Endpoints

### Tourist Management
- `POST /api/register` - Register new tourist
- `POST /api/location` - Update tourist location
- `GET /api/tourist/:id` - Get tourist details

### Safety Features
- `POST /api/panic` - Trigger emergency alert
- `POST /api/geofence-check` - Geo-fencing validation

## 🎯 Demo Simulation

Run the simulation script to test the platform:

```bash
node simulate.js
```

This will:
- Simulate tourist movement patterns
- Generate location updates
- Test emergency alert functionality

## 🔒 Safety Features

### Real-time Monitoring
- Continuous location tracking
- Movement pattern analysis
- Automatic inactivity alerts
- Geo-fence boundary violations

### Emergency Response
- Instant SOS notifications
- Live location sharing with authorities
- Multi-level severity alerts
- Historical incident tracking

### AI-Powered Protection
- Anomaly detection algorithms
- Predictive safety scoring
- Automated threat assessment
- Smart alert prioritization

## 💡 Use Cases

### 🏨 Hospitality Industry
- Hotel guest safety monitoring
- Tour group management
- Resort security enhancement

### 🏛️ Government Tourism
- National tourist safety programs
- Emergency response coordination
- Tourism infrastructure planning

### 👨‍👩‍👧‍👦 Family Travel
- Group safety monitoring
- Child location tracking
- Family emergency coordination

## 🚨 Emergency Features

### SOS Button
- One-tap emergency activation
- Immediate authority notification
- Live location transmission
- Multi-channel alert distribution

### Smart Alerts
- Automated geo-fence breaches
- Inactivity detection
- Movement anomaly alerts
- Weather and hazard warnings

## 📊 Dashboard Features

### Real-time Analytics
- Active tourist count
- Safety score calculations
- Incident severity levels
- System performance metrics

### Management Tools
- Tourist registration system
- Incident logging interface
- Location history viewing
- Alert response coordination

## 🔮 Future Enhancements

- [ ] Mobile application development
- [ ] Multi-language support
- [ ] Advanced AI prediction models
- [ ] Integration with local emergency services
- [ ] Blockchain-based identity verification
- [ ] Weather and natural disaster alerts
- [ ] Group safety features enhancement

## 🤝 Contributing

We welcome contributions! Please feel free to submit pull requests or open issues for bugs and feature requests.

### Development Setup
```bash
git clone https://github.com/ApurbaHalder-hub/SafarSure.git
cd SafarSure
npm install
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For technical support or safety concerns:
- **Emergency**: Use the SOS button in the application
- **Technical Issues**: Open a GitHub issue
- **General Inquiries**: Contact the development team

---

**SafarSure** - Making travel safer, smarter, and more secure through technology innovation. 🌍✈️🛡️

*Built with ❤️ for safer travels worldwide*
