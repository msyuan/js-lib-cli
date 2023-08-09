export const json1 = {
  "devDependencies": {
    "@rollup/plugin-typescript": "^11.1.1",
    "@babel/preset-typescript": "^7.22.5",
    "@typescript-eslint/eslint-plugin": "^5.60.0",
    "@typescript-eslint/parser": "^5.60.0",
    "typescript": "^5.1.3",
    "@types/node": "^20.3.1"
  }
}

export const json2 = {
  "name": "<%=npmname%>",
  "version": "1.0.0",
  "description": "JavaScript库开发的工程模板",
  "type": "module",
  "keywords": [],
  "author": "<%=username%>",
  "license": "MIT",
  "sideEffects": false,
  "main": "dist/<%=name%>.cjs.min.js",
  "module": "dist/<%=name%>.esm.min.js",
  "jsnext": "dist/<%=name%>.esm.min.js",
  "publishConfig": {
    "registry": "https://registry.npmjs.com",
    "access": "public"
  },
  "scripts": {
    "build": "cross-env NODE_ENV=production rollup -c",
    "dev": "cross-env NODE_ENV=developmen rollup -c -w"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/plugin-transform-runtime": "^7.22.5",
    "@babel/preset-env": "^7.22.5",
    "@rollup/plugin-alias": "^5.0.0",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^25.0.2",
    "@rollup/plugin-node-resolve": "^15.1.0",
    "@rollup/plugin-terser": "^0.4.3",
    "cross-env": "^7.0.3",
    "rollup": "^3.25.1"
  }
}

export const json3 = {
  "name": "copy",
  "description": "JavaScript库开发的工程模板",
  "scripts": {
    "build": "cross-env NODE_ENV=production rollup -c"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/plugin-transform-runtime": "^7.22.5",
    "@typescript-eslint/eslint-plugin": "^5.60.0",
    "@typescript-eslint/parser": "^5.60.0"
  }
}


export const json4 = {
  "description": "JavaScript库开发的工程模板",
  "main": "dist/clone.cjs.min.js",
  "scripts": {
    "lint": "pnpm lint-eslint && pnpm lint-prettier"
  },
  "devDependencies": {
    "@babel/core": "^7.22.5",
    "@babel/plugin-transform-runtime": "^7.22.5",
    "typescript": "^5.1.3"
  }
}
