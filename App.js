import React, { useState, useEffect } from 'react';
import FeralLogo from './assets/images/feral-logo.png'; // Adjust this path based on your actual logo location

// Main App Component
function App() {
  const [activeSection, setActiveSection] = useState('home'); // State to manage active section for navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for mobile sidebar visibility

  // Function to handle navigation clicks
  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsSidebarOpen(false); // Close sidebar on navigation click
    // Optional: Scroll to top of the section for better UX
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter text-gray-800 antialiased flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50">
        {/* Logo and Title Container */}
        <div className="flex items-center justify-center md:justify-start w-full md:w-auto relative mb-2 md:mb-0">
          {/* Mobile menu button (positioned absolutely) */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 absolute left-0" // Adjusted for logo
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            aria-label="Toggle navigation"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isSidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Logo */}
          <img
            src={FeralLogo} // Use the imported logo
            alt="Feral AI Logo"
            className="h-8 w-8 mr-2 ml-10 md:ml-0" // Small size, margin right, and left margin for mobile button space
          />
          <h1 className="text-3xl font-bold text-gray-900">FERAL</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 mt-4 md:mt-0">
          <NavLink section="home" current={activeSection} onClick={handleNavClick}>Home</NavLink>
          <NavLink section="getting-started" current={activeSection} onClick={handleNavClick}>Getting Started</NavLink>
          <NavLink section="api-reference" current={activeSection} onClick={handleNavClick}>API Reference</NavLink>
          <NavLink section="interactive-tools" current={activeSection} onClick={handleNavClick}>Interactive Tools</NavLink>
          <NavLink section="examples" current={activeSection} onClick={handleNavClick}>Examples</NavLink>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:translate-x-0 w-64 bg-white shadow-lg p-6 overflow-y-auto
            transition-transform duration-300 ease-in-out z-40 md:z-auto`}
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
          <nav className="space-y-2">
            <SidebarLink section="home" current={activeSection} onClick={handleNavClick}>Introduction</SidebarLink>
            <SidebarLink section="getting-started" current={activeSection} onClick={handleNavClick}>Getting Started</SidebarLink>
            <SidebarLink section="installation" current={activeSection} onClick={handleNavClick}>Installation</SidebarLink>
            <SidebarLink section="data-preparation" current={activeSection} onClick={handleNavClick}>Data Preparation</SidebarLink>
            <SidebarLink section="running-feral" current={activeSection} onClick={handleNavClick}>Running Feral</SidebarLink>
            <SidebarLink section="api-reference" current={activeSection} onClick={handleNavClick}>API Reference</SidebarLink>
            <SidebarLink section="interactive-tools" current={activeSection} onClick={handleNavClick}>Interactive Tools</SidebarLink>
            <SidebarLink section="dataset-validator" current={activeSection} onClick={handleNavClick}>Dataset Validator</SidebarLink>
            <SidebarLink section="examples" current={activeSection} onClick={handleNavClick}>Examples</SidebarLink>
            <SidebarLink section="faq" current={activeSection} onClick={handleNavClick}>FAQ</SidebarLink>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {activeSection === 'home' && <HomeSection handleNavClick={handleNavClick} />}
          {activeSection === 'getting-started' && <GettingStartedSection handleNavClick={handleNavClick} />}
          {activeSection === 'installation' && <InstallationSection />}
          {activeSection === 'data-preparation' && <DataPreparationSection />}
          {activeSection === 'running-feral' && <RunningFeralSection handleNavClick={handleNavClick} />}
          {activeSection === 'api-reference' && <ApiReferenceSection />}
          {activeSection === 'interactive-tools' && <InteractiveToolsSection handleNavClick={handleNavClick} />}
          {activeSection === 'dataset-validator' && <DatasetValidatorSection />}
          {activeSection === 'examples' && <ExamplesSection />}
          {activeSection === 'faq' && <FAQSection />}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 px-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Feral AI. All rights reserved.</p>
        <p className="mt-2">
          <a href="/privacy-policy" className="text-gray-400 hover:underline mx-2">Privacy Policy</a> |
          <a href="/terms-of-service" className="text-gray-400 hover:underline mx-2">Terms of Service</a>
        </p>
      </footer>
    </div>
  );
}

// NavLink Component for Desktop Navigation
const NavLink = ({ section, current, onClick, children }) => (
  <button
    className={`px-3 py-2 rounded-md text-sm font-medium
      ${current === section
        ? 'bg-gray-200 text-gray-900'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
    onClick={() => onClick(section)}
  >
    {children}
  </button>
);

// SidebarLink Component for Sidebar Navigation
const SidebarLink = ({ section, current, onClick, children }) => (
  <button
    className={`block w-full text-left px-3 py-2 rounded-md text-sm
      ${current === section
        ? 'bg-gray-200 text-gray-900 font-semibold'
        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
      } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300`}
    onClick={() => onClick(section)}
  >
    {children}
  </button>
);

// --- Content Sections (Placeholder Components) ---

const HomeSection = ({ handleNavClick }) => (
  <section id="home" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Feral AI Documentation</h2>
    <p className="text-lg text-gray-700 leading-relaxed mb-4">
      Feral AI provides a cutting-edge solution for segmenting and analyzing animal behavior directly from video data.
      Our algorithm automates the tedious process of behavioral annotation,
      allowing researchers to focus on insights rather than manual data extraction.
    </p>
    <p className="text-gray-600 leading-relaxed">
      This documentation will guide you through the installation, data preparation, usage, and advanced features of Feral.
      Explore our interactive tools to ensure your datasets are perfectly structured for optimal performance.
    </p>
    <div className="mt-6 flex flex-wrap gap-4">
      <button
        className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() => handleNavClick('getting-started')}
      >
        Get Started
      </button>
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        onClick={() => handleNavClick('examples')}
      >
        View Examples
      </button>
    </div>
  </section>
);

const GettingStartedSection = ({ handleNavClick }) => (
  <section id="getting-started" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
    <p className="text-gray-700 leading-relaxed">
      This section will walk you through the initial steps to get Feral up and running.
      You'll learn about prerequisites, installation, and a basic workflow.
    </p>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Prerequisites</h3>
    <ul className="list-disc list-inside text-gray-600 ml-4 space-y-2">
      <li>Python 3.8+</li>
      <li>NVIDIA GPU (recommended for performance)</li>
      <li>Basic understanding of command-line interface</li>
    </ul>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Installation</h3>
    <p className="text-gray-700 leading-relaxed">
      Please refer to the <a href="#" onClick={() => handleNavClick('installation')} className="text-gray-600 hover:underline">Installation</a> section for detailed instructions.
    </p>
  </section>
);

const InstallationSection = () => (
  <section id="installation" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Installation</h2>
    <p className="text-gray-700 leading-relaxed">
      Feral AI can be installed via pip or from source. We recommend using a virtual environment.
    </p>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Using pip</h3>
    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>pip install feral-ai</code></pre>
    </div>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">From source</h3>
    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>git clone https://github.com/your-repo/feral-ai.git<br/>cd feral-ai<br/>pip install -e .</code></pre>
    </div>
  </section>
);

const DataPreparationSection = () => (
  <section id="data-preparation" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Preparation</h2>
    <p className="text-gray-700 leading-relaxed">
      Proper data preparation is crucial for Feral performance. This section details the expected
      directory structure and file formats for your video and annotation data.
    </p>

    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Directory Structure</h3>
    <p className="text-gray-700 leading-relaxed mb-2">
      Your project directory should generally follow this structure:
    </p>
    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>
        my_project/<br/>
        ├── videos/<br/>
        │   ├── video1.mp4<br/>
        │   └── video2.avi<br/>
        └── annotations/<br/>
            └── video_annotations.json
      </code></pre>
    </div>

    <p className="text-gray-700 leading-relaxed mt-4">
      Ensure that your video files are in a supported format (e.g., MP4, AVI) and that your annotation files
      are structured correctly. Feral supports the following JSON structure for annotations:
    </p>

    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">JSON Structure</h3>
    <p className="text-gray-700 leading-relaxed mb-4">
      Your dataset JSON file must contain four main sections that define a labeled video dataset for training:
    </p>

    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>{`{
  "labels_are_mece": true,
  "class_names": {
    "0": "other",
    "1": "contact",
    "2": "attempt",
    "3": "flight",
    "4": "kicking",
    "5": "genital_contact",
    "6": "mating"
  },
  "labels": {
    "video_file_1.mp4": [0, 0, 1, 1, 2, 0, 0, 3, 3, 0],
    "video_file_2.mp4": [0, 0, 0, 4, 4, 5, 6, 6, 0, 0],
    "video_file_3.mp4": [0, 1, 1, 0, 0, 0, 2, 2, 3, 0]
  },
  "splits": {
    "train": [
      "video_file_1.mp4",
      "video_file_2.mp4"
    ],
    "val": [
      "video_file_3.mp4"
    ]
  }
}`}</code></pre>
    </div>

    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Field Descriptions</h3>

    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">labels_are_mece (boolean)</h4>
        <p className="text-gray-700 leading-relaxed">
          <strong>Required:</strong> Yes<br/>
          <strong>Description:</strong> Indicates whether labels follow MECE principles (Mutually Exclusive, Collectively Exhaustive)<br/>
          <strong>Value:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">true</code> or <code className="bg-gray-100 px-2 py-1 rounded text-sm">false</code>
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">class_names (object)</h4>
        <p className="text-gray-700 leading-relaxed">
          <strong>Required:</strong> Yes<br/>
          <strong>Description:</strong> Maps numeric class IDs to human-readable class names<br/>
          <strong>Format:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{"class_id": "class_name"}</code><br/>
          <strong>Note:</strong> Class IDs must be strings, even for numeric values (e.g., <code className="bg-gray-100 px-2 py-1 rounded text-sm">"0"</code>, <code className="bg-gray-100 px-2 py-1 rounded text-sm">"1"</code>)
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">labels (object)</h4>
        <p className="text-gray-700 leading-relaxed">
          <strong>Required:</strong> Yes<br/>
          <strong>Description:</strong> Contains frame-by-frame or time-segment labels for each video<br/>
          <strong>Format:</strong> <code className="bg-gray-100 px-2 py-1 rounded text-sm">{"video_filename.mp4": [array_of_class_ids]}</code><br/>
          <strong>Note:</strong> Each integer in the array must correspond to a class ID defined in <code className="bg-gray-100 px-2 py-1 rounded text-sm">class_names</code>
        </p>
      </div>

      <div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2">splits (object)</h4>
        <p className="text-gray-700 leading-relaxed">
          <strong>Required:</strong> Yes<br/>
          <strong>Description:</strong> Defines dataset partitions for training and validation<br/>
          <strong>Fields:</strong><br/>
          • <code className="bg-gray-100 px-2 py-1 rounded text-sm">train</code>: Array of video filenames for training<br/>
          • <code className="bg-gray-100 px-2 py-1 rounded text-sm">val</code>: Array of video filenames for validation<br/>
          <strong>Note:</strong> All filenames must have corresponding entries in the <code className="bg-gray-100 px-2 py-1 rounded text-sm">labels</code> section
        </p>
      </div>
    </div>

    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Requirements</h3>
    <ul className="text-gray-700 leading-relaxed space-y-2">
      <li><strong>Consistency:</strong> All video files referenced in <code className="bg-gray-100 px-2 py-1 rounded text-sm">splits</code> must have corresponding label data in <code className="bg-gray-100 px-2 py-1 rounded text-sm">labels</code></li>
      <li><strong>Valid Class IDs:</strong> All integers in label arrays must exist as keys in <code className="bg-gray-100 px-2 py-1 rounded text-sm">class_names</code></li>
      <li><strong>File Extensions:</strong> Video filenames should include the <code className="bg-gray-100 px-2 py-1 rounded text-sm">.mp4</code> extension</li>
      <li><strong>Array Length:</strong> Label arrays should match the temporal segmentation of their corresponding videos</li>
    </ul>

    <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
      <p className="text-blue-800 font-medium">
        💡 <strong>Tip:</strong> The above structure allows the training system to load video files and their corresponding labels,
        map numeric labels to meaningful class names, split the dataset into training and validation sets,
        and understand whether labels are mutually exclusive.
      </p>
    </div>
  </section>
);

const RunningFeralSection = ({ handleNavClick }) => (
  <section id="running-feral" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Running Feral AI</h2>
    <p className="text-gray-700 leading-relaxed">
      Once your data is prepared, you can run the Feral AI algorithm using the command-line interface.
    </p>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Basic Usage</h3>
    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>feral-ai process --config config.yaml --output results/</code></pre>
    </div>
    <p className="text-gray-700 leading-relaxed mt-4">
      Refer to the <a href="#" onClick={() => handleNavClick('api-reference')} className="text-gray-600 hover:underline">API Reference</a> for all available command-line arguments and configuration options.
    </p>
  </section>
);

const ApiReferenceSection = () => (
  <section id="api-reference" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">API Reference</h2>
    <p className="text-gray-700 leading-relaxed">
      This section provides detailed documentation for all functions, classes, and command-line arguments
      available in the Feral AI library.
    </p>
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">feral_ai.core.process_video</h3>
    <p className="text-gray-700 leading-relaxed mb-2">
      Processes a single video file to extract behavioral segments.
    </p>
    <div className="bg-gray-100 p-4 rounded-md text-sm font-mono overflow-x-auto">
      <pre><code>
        def process_video(video_path: str, config: dict) -&gt; dict:<br/>
            """<br/>
            Processes a video and returns behavioral segmentation data.<br/>
        <br/>
            Args:<br/>
                video_path (str): Path to the input video file.<br/>
                config (dict): Configuration dictionary for the algorithm.<br/>
        <br/>
            Returns:<br/>
                dict: A dictionary containing segmentation results.<br/>
            """
      </code></pre>
    </div>
  </section>
);

const InteractiveToolsSection = ({ handleNavClick }) => (
  <section id="interactive-tools" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Tools</h2>
    <p className="text-gray-700 leading-relaxed mb-4">
      Our interactive tools help you prepare your data and understand Feral AI's requirements.
      Use the Dataset Validator to ensure your files are correctly structured before running the algorithm.
    </p>
    <button
      className="bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
      onClick={() => handleNavClick('dataset-validator')}
    >
      Go to Dataset Validator
    </button>
  </section>
);

// DatasetValidatorSection - This is where your interactive widget will go
const DatasetValidatorSection = () => {
  const [file, setFile] = useState(null);
  const [validationResult, setValidationResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setValidationResult(null);
    setError(null);
  };

  const validateDataset = async () => {
    if (!file) {
      setError("Please select a file to validate.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setValidationResult(null);

    // Simulate API call to a backend or client-side processing
    // In a real scenario, you'd send the file to your backend for validation
    // or process it client-side if feasible (e.g., parsing JSON/CSV).
    try {
      // Example: Read file as text and simulate validation
      const reader = new FileReader();
      reader.onload = async (e) => {
        const fileContent = e.target.result;
        let result = {};

        // Simulate different validation outcomes based on file content
        if (file.name.endsWith('.json')) {
          try {
            const data = JSON.parse(fileContent);
            // Enhanced simulation for DataPreparationSection JSON structure
            if (data.labels_are_mece !== undefined && data.class_names && data.labels && data.splits) {
              result = {
                status: 'success',
                message: `JSON file "${file.name}" seems to have a valid Feral AI dataset structure.`,
                details: `Found 'labels_are_mece', 'class_names', 'labels', and 'splits' keys.`,
                issues: []
              };
            } else {
              result = {
                status: 'warning',
                message: `JSON file "${file.name}" might be missing expected Feral AI dataset keys.`,
                details: `Expected 'labels_are_mece', 'class_names', 'labels', and 'splits' keys.`,
                issues: []
              };
              if (data.labels_are_mece === undefined) result.issues.push('Missing "labels_are_mece" field');
              if (!data.class_names) result.issues.push('Missing "class_names" object');
              if (!data.labels) result.issues.push('Missing "labels" object');
              if (!data.splits) result.issues.push('Missing "splits" object');
            }
          } catch (parseError) {
            result = {
              status: 'error',
              message: `Invalid JSON format for file "${file.name}".`,
              details: parseError.message,
              issues: ['JSON parsing error']
            };
          }
        } else if (file.name.endsWith('.csv')) {
          if (fileContent.includes('video_id,timestamp,x,y,behavior')) {
            result = {
              status: 'success',
              message: `CSV file "${file.name}" has expected headers.`,
              details: `Looks like a valid annotation CSV.`,
              issues: []
            };
          } else {
            result = {
              status: 'warning',
              message: `CSV file "${file.name}" might have unexpected headers.`,
              details: `Expected 'video_id,timestamp,x,y,behavior'.`,
              issues: ['Unexpected CSV headers']
            };
          }
        } else {
          result = {
            status: 'info',
            message: `File "${file.name}" is not a recognized format (.json, .csv).`,
            details: 'Please upload a JSON or CSV file for validation.',
            issues: []
          };
        }
        setValidationResult(result);
        setIsLoading(false);
      };
      reader.readAsText(file);

    } catch (err) {
      setError(`An unexpected error occurred: ${err.message}`);
      setIsLoading(false);
    }
  };

  return (
    <section id="dataset-validator" className="bg-white p-8 rounded-lg shadow-md mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Dataset Validator</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Use this tool to check if your dataset's structure is compatible with Feral AI.
        Upload your configuration file (e.g., JSON) or annotation file (e.g., CSV) to get instant feedback.
      </p>

      <div className="mb-6">
        <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">
          Upload your dataset file:
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-gray-200 file:text-gray-700
            hover:file:bg-gray-300"
        />
        {file && (
          <p className="mt-2 text-sm text-gray-600">Selected file: <span className="font-medium">{file.name}</span></p>
        )}
      </div>

      <button
        onClick={validateDataset}
        disabled={!file || isLoading}
        className={`bg-gray-900 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-md
          transition duration-300 ease-in-out transform hover:-translate-y-1
          ${(!file || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'Validating...' : 'Validate Dataset'}
      </button>

      {error && (
        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-md" role="alert">
          <p className="font-bold">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {validationResult && (
        <div className={`mt-6 p-6 rounded-lg shadow-inner
          ${validationResult.status === 'success' ? 'bg-green-50 border-green-400' :
             validationResult.status === 'warning' ? 'bg-yellow-50 border-yellow-400' :
             'bg-gray-50 border-gray-400'} border-l-4`}>
          <h3 className={`text-xl font-bold mb-2
            ${validationResult.status === 'success' ? 'text-green-700' :
               validationResult.status === 'warning' ? 'text-yellow-700' :
               'text-gray-700'}`}>
            Validation {validationResult.status === 'success' ? 'Successful!' :
                         validationResult.status === 'warning' ? 'with Warnings' :
                         'Information'}
          </h3>
          <p className="text-gray-800 mb-2">{validationResult.message}</p>
          {validationResult.details && <p className="text-gray-600 text-sm mb-2">{validationResult.details}</p>}
          {validationResult.issues && validationResult.issues.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold text-gray-700">Potential Issues:</p>
              <ul className="list-disc list-inside text-gray-600 ml-4">
                {validationResult.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </section>
  );
};


const ExamplesSection = () => (
  <section id="examples" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Examples</h2>
    <p className="text-gray-700 leading-relaxed">
      Browse through various examples demonstrating how to use Feral AI for different
      behavioral analysis tasks.
    </p>
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Rodent Locomotion</h3>
        <p className="text-gray-600 text-sm">
          Example demonstrating tracking and segmenting locomotion patterns in rodents.
        </p>
        <button className="mt-4 text-gray-600 hover:underline text-sm">View Example</button>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Fish Schooling Behavior</h3>
        <p className="text-gray-600 text-sm">
          Analyzing collective behavior and interactions in fish schools.
        </p>
        <button className="mt-4 text-gray-600 hover:underline text-sm">View Example</button>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section id="faq" className="bg-white p-8 rounded-lg shadow-md mb-8">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
    <div className="space-y-4">
      <details className="group border-b border-gray-200 pb-4">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
          How accurate is Feral AI?
          <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </summary>
        <p className="mt-2 text-gray-600">
          Feral AI leverages state-of-the-art deep learning models, achieving high accuracy comparable to,
          and often exceeding, manual annotation for a wide range of behaviors. Accuracy can vary based on
          video quality and specific behavioral complexity.
        </p>
      </details>
      <details className="group border-b border-gray-200 pb-4">
        <summary className="flex justify-between items-center cursor-pointer text-lg font-semibold text-gray-800">
          What video formats are supported?
          <svg className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </summary>
        <p className="mt-2 text-gray-600">
          Feral AI supports common video formats such as MP4, AVI, MOV, and MKV. For best results,
          we recommend using high-resolution videos with stable lighting.
        </p>
      </details>
    </div>
  </section>
);


export default App;