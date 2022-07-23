import { useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useBooksQuery, useCurrentQuery } from "redux/api/bookAPI";
import { isAuth, loggedOff } from "redux/auth";

import { getTraining, getResults } from "services";
import useRefreshToken from "hooks/useRefreshToken";

const QueryErrorHandler = () => {
  const auth = useSelector(isAuth);
  const dispatch = useDispatch();
  const checkRefreshToken = useRefreshToken();
  const { error: currentError } = useCurrentQuery(null, { skip: !auth });
  const { error: booksError } = useBooksQuery(null, { skip: !auth });
  const isToken = !!axios.defaults.headers.common.Authorization;
  const { error: trainingError } = useQuery(["training"], getTraining, {
    enabled: isToken && auth,
    retry: false,
  });
  const { error: resultsError } = useQuery(["results"], getResults, {
    enabled: isToken && auth,
    retry: false,
  });

  const queryError =
    currentError || booksError || trainingError || resultsError;

  useEffect(() => {
    if (!queryError) return;
    (async () => {
      try {
        await checkRefreshToken();
      } catch (error) {
        dispatch(loggedOff());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryError]);
  return null;
};
export default QueryErrorHandler;
