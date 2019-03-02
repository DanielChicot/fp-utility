const {create, env} = require('sanctuary');
const $ = require('sanctuary-def');
const R = require('ramda');
const RA = require('ramda-adjunct');
const {env: flutureEnv} = require('fluture-sanctuary-types');
const Future = require('fluture');

const S = create ({
    checkTypes: false, //process.env.NODE_ENV !== 'production',
    env: env.concat (flutureEnv)
});

const maybeToFuture = S.ifElse (S.isJust)
                               (S.compose (Future.of) (S.maybeToNullable))
                               (Future.reject);

const futurisedMaybe = S.compose (maybeToFuture);
const fChain = S.compose (S.chain) (futurisedMaybe);

const op = entity => operation => R.bind (S.prop (operation) (entity)) (entity);
const po = S.flip (op);

const stdout = S.flip (R.invoker (1) ('log')) (console);
const stddir = S.flip (R.invoker (1) ('dir')) (console);
const stderr = S.flip (R.invoker (1) ('error')) (console);
const group = S.flip (R.invoker (1) ('group')) (console);
const groupEnd = R.invoker (0) ('groupEnd');

const information = header => message => {
    group (header);
    stdout (message);
    groupEnd (console);
};

module.exports = {
    $,
    Future,
    R,
    RA,
    S,
    fChain,
    futurisedMaybe,
    maybeToFuture,
    op,
    po,
    stdout,
    stddir,
    stderr,
    group,
    groupEnd,
    information,
};
