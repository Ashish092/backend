const fs = require('fs');
const path = require('path');

const requiredStructure = {
    backend: {
        config: ['db.js'],
        controllers: [
            'adminController.js',
            'blogController.js',
            'faqController.js',
            'userController.js'
        ],
        middleware: ['authMiddleware.js'],
        models: [
            'Blog.js',
            'Faq.js',
            'User.js'
        ],
        routes: [
            'adminRoutes.js',
            'blogRoutes.js',
            'faqRoutes.js',
            'userRoutes.js'
        ],
        scripts: [
            'cleanup.js',
            'seedBlogs.js',
            'seedFaqs.js',
            'testConnection.js',
            'verifyBlogs.js',
            'verifyStructure.js'
        ]
    },
    frontend: {
        src: {
            app: {
                admin: {
                    website: {
                        blog: ['page.tsx']
                    },
                    faqs: ['page.tsx'],
                    login: ['page.tsx'],
                    'layout.tsx': null,
                    'page.tsx': null
                },
                blog: {
                    '[slug]': ['page.tsx'],
                    'page.tsx': null
                },
                faqs: ['page.tsx'],
                'globals.css': null,
                'layout.tsx': null,
                'page.tsx': null
            }
        },
        public: {},
        'next.config.js': null,
        'package.json': null
    }
};

const unusedFiles = [];
const missingFiles = [];
const wrongLocationFiles = [];

const checkStructure = (basePath, structure, currentPath = '') => {
    for (const [key, value] of Object.entries(structure)) {
        const fullPath = path.join(basePath, currentPath, key);
        
        if (Array.isArray(value)) {
            // Check directory contents
            if (!fs.existsSync(fullPath)) {
                missingFiles.push(fullPath);
                continue;
            }
            
            const dirContents = fs.readdirSync(fullPath);
            value.forEach(file => {
                if (!dirContents.includes(file)) {
                    missingFiles.push(path.join(fullPath, file));
                }
            });
            
            // Check for unexpected files
            dirContents.forEach(file => {
                if (!value.includes(file)) {
                    unusedFiles.push(path.join(fullPath, file));
                }
            });
        } else if (value === null) {
            // Check file existence
            if (!fs.existsSync(fullPath)) {
                missingFiles.push(fullPath);
            }
        } else {
            // Recurse into subdirectories
            if (!fs.existsSync(fullPath)) {
                missingFiles.push(fullPath);
                continue;
            }
            checkStructure(basePath, value, path.join(currentPath, key));
        }
    }
};

console.log('Starting structure verification...\n');

// Check backend structure
console.log('Checking backend structure...');
checkStructure(path.resolve(__dirname, '..'), requiredStructure.backend);

// Check frontend structure
console.log('\nChecking frontend structure...');
checkStructure(path.resolve(__dirname, '../../frontend'), requiredStructure.frontend);

// Print results
console.log('\n=== Verification Results ===\n');

if (missingFiles.length > 0) {
    console.log('Missing Files:');
    missingFiles.forEach(file => console.log(`❌ ${file}`));
}

if (unusedFiles.length > 0) {
    console.log('\nUnused/Extra Files:');
    unusedFiles.forEach(file => console.log(`⚠️  ${file}`));
}

if (wrongLocationFiles.length > 0) {
    console.log('\nFiles in Wrong Location:');
    wrongLocationFiles.forEach(file => console.log(`🔄 ${file}`));
}

if (missingFiles.length === 0 && unusedFiles.length === 0 && wrongLocationFiles.length === 0) {
    console.log('✅ All files are in their correct locations!');
}

console.log('\nVerification complete!'); 