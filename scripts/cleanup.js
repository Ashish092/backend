const fs = require('fs');
const path = require('path');

// Paths to check and clean
const paths = {
    frontend: '../frontend',
    backend: './',
    oldFrontend: '../frontend/cleaningweb'
};

// Files that should be moved from cleaningweb to frontend
const filesToMove = [
    'src/app/admin/website/blog/page.tsx',
    'src/app/admin/faqs/page.tsx',
    'src/app/admin/login/page.tsx',
    'src/app/admin/layout.tsx',
    'src/app/admin/page.tsx',
    'src/app/blog/[slug]/page.tsx',
    'src/app/blog/page.tsx',
    'src/app/faqs/page.tsx',
    'src/app/globals.css',
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'next.config.js',
    'package.json'
];

// Function to move files
const moveFiles = async () => {
    try {
        // Check if cleaningweb folder exists
        if (fs.existsSync(paths.oldFrontend)) {
            // Move each file
            filesToMove.forEach(file => {
                const oldPath = path.join(paths.oldFrontend, file);
                const newPath = path.join(paths.frontend, file);

                // Create directories if they don't exist
                const dir = path.dirname(newPath);
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }

                // Move file if it exists
                if (fs.existsSync(oldPath)) {
                    fs.renameSync(oldPath, newPath);
                    console.log(`Moved: ${file}`);
                }
            });

            // Remove cleaningweb folder
            fs.rmdirSync(paths.oldFrontend, { recursive: true });
            console.log('Removed cleaningweb folder');
        }
    } catch (error) {
        console.error('Error moving files:', error);
    }
};

// Function to update import paths
const updateImports = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    let updatedContent = content
        .replace(/from ['"]@\/cleaningweb\//g, 'from \'@/')
        .replace(/from ['"]\.\.\/cleaningweb\//g, 'from \'../');
    
    fs.writeFileSync(filePath, updatedContent);
};

// Main cleanup function
const cleanup = async () => {
    console.log('Starting cleanup process...');

    // Move files from cleaningweb
    await moveFiles();

    // Update paths in backend files
    const backendFiles = [
        'server.js',
        'controllers/blogController.js',
        'controllers/faqController.js',
        'controllers/adminController.js'
    ];

    backendFiles.forEach(file => {
        const filePath = path.join(paths.backend, file);
        if (fs.existsSync(filePath)) {
            updateImports(filePath);
            console.log(`Updated imports in: ${file}`);
        }
    });

    console.log('Cleanup completed!');
};

cleanup(); 