#!/bin/bash

echo "Fixing framer-motion imports to include 'm' shorthand..."

# Find all TypeScript files that use m. but don't import m from framer-motion
for file in $(find . -name "*.ts" -o -name "*.tsx" | xargs grep -l "m\." | head -50); do
    # Check if the file has framer-motion import but doesn't include m
    if grep -q "from ['\"]framer-motion['\"]" "$file" && ! grep -q "import.*{.*m.*}.*framer-motion" "$file"; then
        echo "Fixing $file..."
        
        # Different patterns for different import styles
        if grep -q "import { motion } from ['\"]framer-motion['\"]" "$file"; then
            sed -i "s/import { motion } from 'framer-motion'/import { motion, m } from 'framer-motion'/g" "$file"
            sed -i 's/import { motion } from "framer-motion"/import { motion, m } from "framer-motion"/g' "$file"
        elif grep -q "import { motion, AnimatePresence } from ['\"]framer-motion['\"]" "$file"; then
            sed -i "s/import { motion, AnimatePresence } from 'framer-motion'/import { motion, AnimatePresence, m } from 'framer-motion'/g" "$file"
            sed -i 's/import { motion, AnimatePresence } from "framer-motion"/import { motion, AnimatePresence, m } from "framer-motion"/g' "$file"
        elif grep -q "import { motion, LazyMotion, domAnimation, useInView } from ['\"]framer-motion['\"]" "$file"; then
            sed -i "s/import { motion, LazyMotion, domAnimation, useInView } from 'framer-motion'/import { motion, LazyMotion, domAnimation, useInView, m } from 'framer-motion'/g" "$file"
            sed -i 's/import { motion, LazyMotion, domAnimation, useInView } from "framer-motion"/import { motion, LazyMotion, domAnimation, useInView, m } from "framer-motion"/g' "$file"
        elif grep -q "import { motion, LazyMotion, domAnimation } from ['\"]framer-motion['\"]" "$file"; then
            sed -i "s/import { motion, LazyMotion, domAnimation } from 'framer-motion'/import { motion, LazyMotion, domAnimation, m } from 'framer-motion'/g" "$file"
            sed -i 's/import { motion, LazyMotion, domAnimation } from "framer-motion"/import { motion, LazyMotion, domAnimation, m } from "framer-motion"/g' "$file"
        fi
        
        echo "Fixed $file"
    fi
done

echo "Done fixing framer-motion imports!"